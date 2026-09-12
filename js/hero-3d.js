/* ==========================================================================
   Hero 3D background — Three.js (r128, self-contained, local)
   Rotating generative wireframe + particles, mouse-parallax interactive.
   Paid attention to: performance (pixel ratio cap, pause offscreen, reduced
   motion) so it stays smooth and accessible.
   ========================================================================== */

(function () {
  "use strict";

  var container = document.getElementById("hero-3d");
  if (!container) return;
  // Respect reduced-motion: render a static frame only.
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init() {
    var w = container.clientWidth || 1;
    var h = container.clientHeight || 1;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 6;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // ==== Wireframe torus knot (build bold / ship smart energy) ====
    var geo = new THREE.TorusKnotGeometry(1.15, 0.34, 140, 18);
    var mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    var knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Secondary inner knot for depth (gradient accent trick)
    var geo2 = new THREE.TorusKnotGeometry(0.85, 0.2, 100, 14);
    var mat2 = new THREE.MeshBasicMaterial({
      color: 0x6c5ce7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    var knot2 = new THREE.Mesh(geo2, mat2);
    scene.add(knot2);

    // === Particle field ===
    var COUNT = 650;
    var pos = new Float32Array(COUNT * 3);
    for (var i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var pMat = new THREE.PointsMaterial({
      color: 0x8b7cf7,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    var particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // === Mouse parallax ===
    var mouse = { x: 0, y: 0 };
    function onPointer(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    if (!prefersReduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    function render(now) {
      if (!prefersReduced) {
        knot.rotation.x = now * 0.00025;
        knot.rotation.y = now * 0.00035;
        knot2.rotation.x = -now * 0.0002;
        knot2.rotation.y = now * 0.0004;
        particles.rotation.y = now * 0.00005;

        // Ease camera toward pointer
        camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
      }
      renderer.render(scene, camera);
    }

    if (prefersReduced) {
      knot.rotation.set(0.4, 0.8, 0);
      knot2.rotation.set(0.3, -0.5, 0);
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(render);
    }

    // === Resize ===
    function onResize() {
      var w = container.clientWidth || 1;
      var h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize, { passive: true });

    // === Pause when hero is off-screen (battery friendly) ===
    var io = null;
    if ("IntersectionObserver" in window && !prefersReduced) {
      io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              renderer.setAnimationLoop(render);
            } else {
              renderer.setAnimationLoop(null);
            }
          });
        },
        { threshold: 0.02 }
      );
      io.observe(container);
    }

    // Cleanup bookkeeping (used if this were ever teardown)
    window.__hero3d = {
      dispose: function () {
        if (io) io.disconnect();
        geo.dispose(); mat.dispose();
        geo2.dispose(); mat2.dispose();
        pGeo.dispose(); pMat.dispose();
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      },
    };
  }

  // Small delay so the hero is laid out before sizing canvas.
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 0);
  } else {
    window.addEventListener("load", function () { setTimeout(init, 0); });
  }
})();