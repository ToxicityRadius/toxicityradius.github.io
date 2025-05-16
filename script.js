console.log("Script.js loaded: Starting animation setup");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideInElements = document.querySelectorAll('.slide-in');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeInElements.forEach(element => observer.observe(element));
    slideInElements.forEach(element => observer.observe(element));

    // Text changing effect for #changing-subtext with letter-by-letter disappear and appear
    const subtextPhrases = ["Data Scientist", "Frontend Developer", "Problem Solver", "Team Player", "Lifelong Learner"];
    let currentSubtextIndex = 0;
    const changingSubtextElement = document.getElementById('changing-subtext');


    function typeWriter(text, i, callback) {
        if (i < text.length) {
            changingSubtextElement.textContent = text.substring(0, i + 1) + '_';
            setTimeout(() => typeWriter(text, i + 1, callback), 100);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }

    function deleteWriter(text, i, callback) {
        if (i >= 0) {
            changingSubtextElement.textContent = text.substring(0, i) + '_';
            setTimeout(() => deleteWriter(text, i - 1, callback), 50);
        } else if (callback) {
            callback();
        }
    }

    function changeSubtext() {
        const currentText = subtextPhrases[currentSubtextIndex];
        deleteWriter(currentText, currentText.length, () => {
            currentSubtextIndex = (currentSubtextIndex + 1) % subtextPhrases.length;
            typeWriter(subtextPhrases[currentSubtextIndex], 0, () => {
                setTimeout(changeSubtext, 1000);
            });
        });
    }

    typeWriter(subtextPhrases[currentSubtextIndex], 0, () => {
        setTimeout(changeSubtext, 2000);
    });
});

const scene = new THREE.Scene();
console.log("Scene created");

const heroContainer = document.querySelector('.hero-container');

const camera = new THREE.PerspectiveCamera(25, heroContainer.clientWidth / heroContainer.clientHeight, 0.1, 1000);
camera.position.z = 22;
console.log("Camera positioned at z =", camera.position.z);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl"),
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0); // transparent background
renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
console.log("Renderer created and configured");

window.addEventListener('resize', () => {
    const width = heroContainer.clientWidth;
    const height = heroContainer.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

const radii = [
    1, 0.6, 0.8, 0.4, 0.9, 0.7, 0.9, 0.3, 0.2, 0.5,
    0.6, 0.4, 0.5, 0.6, 0.7, 0.3, 0.4, 0.8, 0.7, 0.5,
    0.4, 0.6, 0.35, 0.38, 0.9, 0.3, 0.6, 0.4, 0.2, 0.35,
    0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8,
    0.7, 0.8, 0.3, 0.5, 0.6, 0.55, 0.42, 0.75, 0.66, 0.6,
    0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8,
    0.4, 0.89, 0.3, 0.3, 0.6, 0.4, 0.2, 0.52, 0.5, 0.15,
    0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8,
    0.3, 0.5, 0.6, 0.8, 0.7, 0.75, 0.66, 0.6, 0.7, 0.5,
    0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7, 0.8, 0.4, 0.89,
    0.3
];

const positions = [
    { x: 0, y: 0, z: 0 }, { x: 1.2, y: 0.9, z: -0.5 }, { x: 1.8, y: -0.3, z: 0 },
    { x: -1, y: -1, z: 0 }, { x: -1, y: 1.62, z: 0 }, { x: -1.65, y: 0, z: -0.4 },
    { x: -2.13, y: -1.54, z: -0.4 }, { x: 0.8, y: 0.94, z: 0.3 }, { x: 0.5, y: -1, z: 1.2 },
    { x: -0.16, y: -1.2, z: 0.9 }, { x: 1.5, y: 1.2, z: 0.8 }, { x: 0.5, y: -1.58, z: 1.4 },
    { x: -1.5, y: 1, z: 1.15 }, { x: -1.5, y: -1.5, z: 0.99 }, { x: -1.5, y: -1.5, z: -1.9 },
    { x: 1.85, y: 0.8, z: 0.05 }, { x: 1.5, y: -1.2, z: -0.75 }, { x: 0.9, y: -1.62, z: 0.22 },
    { x: 0.45, y: 2, z: 0.65 }, { x: 2.5, y: 1.22, z: -0.2 }, { x: 2.35, y: 0.7, z: 0.55 },
    { x: -1.8, y: -0.35, z: 0.85 }, { x: -1.02, y: 0.2, z: 0.9 }, { x: 0.2, y: 1, z: 1 },
    { x: -2.88, y: 0.7, z: 1 }, { x: -2, y: -0.95, z: 1.5 }, { x: -2.3, y: 2.4, z: -0.1 },
    { x: -2.5, y: 1.9, z: 1.2 }, { x: -1.8, y: 0.37, z: 1.2 }, { x: -2.4, y: 1.42, z: 0.05 },
    { x: -2.72, y: -0.9, z: 1.1 }, { x: -1.8, y: -1.34, z: 1.67 }, { x: -1.6, y: 1.66, z: 0.91 },
    { x: -2.8, y: 1.58, z: 1.69 }, { x: -2.97, y: 2.3, z: 0.65 }, { x: 1.1, y: -0.2, z: -1.45 },
    { x: -4, y: 1.78, z: 0.38 }, { x: 0.12, y: 1.4, z: -1.29 }, { x: -1.64, y: 1.4, z: -1.79 },
    { x: -3.5, y: -0.58, z: 0.1 }, { x: -0.1, y: -1, z: -2 }, { x: -4.5, y: 0.55, z: -0.5 },
    { x: -3.87, y: 0, z: 1 }, { x: -4.6, y: -0.1, z: 0.65 }, { x: -3, y: 1.5, z: -0.7 },
    { x: -0.5, y: 0.2, z: -1.5 }, { x: -1.3, y: -0.45, z: -1.5 }, { x: -3.35, y: 0.25, z: -1.5 },
    { x: -4.76, y: -1.26, z: 0.4 }, { x: -4.32, y: 0.85, z: 1.4 }, { x: -3.5, y: -1.82, z: 0.9 },
    { x: -3.6, y: -0.6, z: 1.46 }, { x: -4.55, y: -1.5, z: 1.63 }, { x: -3.8, y: -1.15, z: 2.1 },
    { x: 2.9, y: -0.25, z: 1.86 }, { x: 2.2, y: -0.4, z: 1.86 }, { x: 5.1, y: -0.24, z: 1.86 },
    { x: 5.27, y: 1.24, z: 0.76 }, { x: 5.27, y: 2, z: -0.4 }, { x: 6.4, y: 0.4, z: 1 },
    { x: 5.15, y: 0.95, z: 2 }, { x: 6.2, y: 0.5, z: -0.8 }, { x: 4, y: 0.08, z: 1.8 }
];

const group = new THREE.Group();
const spheres = [];

const lerp = (a, b, t) => a + (b - a) * t;

positions.forEach((pos, index) => {
    const radius = radii[index];
    const geometry = new THREE.SphereGeometry(radius, 64, 64);

    // Calculate gray shade from light to dark
    const t = index / (positions.length - 1);
    const lightGray = 0xd3d3d3;
    const darkGray = 0x4f4f4f;

    // Change to pink gradient colors
    const lightPink = 0xffc0cb; // light pink
    const darkPink = 0xdb7093;  // pale violet red

    const r = Math.round(lerp((lightPink >> 16) & 0xff, (darkPink >> 16) & 0xff, t));
    const g = Math.round(lerp((lightPink >> 8) & 0xff, (darkPink >> 8) & 0xff, t));
    const b = Math.round(lerp(lightPink & 0xff, darkPink & 0xff, t));

    const colorHex = (r << 16) | (g << 8) | b;

    const material = new THREE.MeshLambertMaterial({
        color: colorHex,
        emissive: 0x000000
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(pos.x, pos.y, pos.z);
    sphere.userData = { originalPosition: { ...pos }, radius };
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    spheres.push(sphere);
    group.add(sphere);
});

scene.add(group);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 0.52);
spotLight.position.set(14, 24, 30);
spotLight.castShadow = true;
scene.add(spotLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight1.position.set(0, -4, 0);
scene.add(directionalLight1);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tempVector = new THREE.Vector3();
const forces = new Map();

const initY = -25;
const revolutionRadius = 4;
const revolutionDuration = 2;

const breathingAmplitude = 0.1;
const breathingSpeed = 0.002;

spheres.forEach(sphere => {
    sphere.position.y = initY;
});

function initLoadingAnimation() {
    const timelines = [];
    spheres.forEach((sphere, i) => {
        const delay = i * 0.02;
        const tl = gsap.timeline()
            .to(sphere.position, {
                duration: revolutionDuration / 2,
                y: revolutionRadius,
                ease: "power2.inOut",
                onUpdate() {
                    const progress = this.progress();
                    sphere.position.z = sphere.userData.originalPosition.z + Math.sin(progress * Math.PI) * revolutionRadius;
                },
                delay
            })
            .to(sphere.position, {
                duration: revolutionDuration / 2,
                y: initY / 5,
                ease: "power2.inOut",
                onUpdate() {
                    const progress = this.progress();
                    sphere.position.z = sphere.userData.originalPosition.z - Math.sin(progress * Math.PI) * revolutionRadius;
                }
            })
            .to(sphere.position, {
                duration: 0.8,
                x: sphere.userData.originalPosition.x,
                y: sphere.userData.originalPosition.y,
                z: sphere.userData.originalPosition.z,
                ease: "power3.out"
            })
            .to(sphere.scale, {
                duration: 0.8,
                x: 1,
                y: 1,
                z: 1,
                ease: "power3.out"
            }, "-=0.8");
        timelines.push(tl);
    });

    // When all timelines complete, trigger hero text and label transition
    Promise.all(timelines.map(tl => tl.then ? tl.then(() => {}) : Promise.resolve()))
        .then(() => {
            const heroTexts = document.querySelectorAll('.hero-text');
            heroTexts.forEach(el => {
                el.classList.add('visible');
            });
            const heroLabels = document.querySelectorAll('.hero-label');
            heroLabels.forEach(el => {
                el.classList.add('visible');
            });
        });
}

window.addEventListener("load", initLoadingAnimation);

const hiddenElements = document.querySelectorAll(".hide-text");
const main_txt = document.querySelector(".main-txt");
const mouse_effect = document.querySelector(".mouse-effect");

hiddenElements.forEach(el => el.style.opacity = "0");

let loadingComplete = false;
setTimeout(() => {
    loadingComplete = true;
    hiddenElements.forEach(el => { if (el) el.style.opacity = "1"; });
    if (main_txt) main_txt.style.opacity = "0";
}, (revolutionDuration + 1) * 1000);

gsap.set(".circle", { xPercent: -50, yPercent: -50 });
gsap.set(".circle-follow", { xPercent: -50, yPercent: -50 });

const xTo = gsap.quickTo(".circle", "x", { duration: 0.6, ease: "power3" });
const yTo = gsap.quickTo(".circle", "y", { duration: 0.6, ease: "power3" });
const xFollow = gsap.quickTo(".circle-follow", "x", { duration: 0.6, ease: "power3" });
const yFollow = gsap.quickTo(".circle-follow", "y", { duration: 0.6, ease: "power3" });

function onMouseMove(event) {
    if (!loadingComplete) return;

    xTo(event.clientX);
    yTo(event.clientY);
    xFollow(event.clientX);
    yFollow(event.clientY);

    if (mouse_effect) {
        mouse_effect.style.opacity = "1";
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);

    if (intersects.length > 0) {
        const hoveredSphere = intersects[0].object;
        const force = new THREE.Vector3();
        force.subVectors(intersects[0].point, hoveredSphere.position).normalize().multiplyScalar(0.2);
        forces.set(hoveredSphere.uuid, force);
    }
}

function handleCollisions() {
    for (let i = 0; i < spheres.length; i++) {
        const sphereA = spheres[i];
        const radiusA = sphereA.userData.radius;

        for (let j = i + 1; j < spheres.length; j++) {
            const sphereB = spheres[j];
            const radiusB = sphereB.userData.radius;

            const distance = sphereA.position.distanceTo(sphereB.position);
            const minDistance = (radiusA + radiusB) * 1.2;

            if (distance < minDistance) {
                tempVector.subVectors(sphereB.position, sphereA.position).normalize();

                const pushStrength = (minDistance - distance) * 0.4;
                sphereA.position.sub(tempVector.clone().multiplyScalar(pushStrength));
                sphereB.position.add(tempVector.clone().multiplyScalar(pushStrength));
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (loadingComplete) {
        const time = Date.now() * breathingSpeed;
        spheres.forEach((sphere, i) => {
            const offset = i * 0.2;
            const breathingY = Math.sin(time + offset) * breathingAmplitude;
            const breathingZ = Math.cos(time + offset) * breathingAmplitude * 0.5;

            const force = forces.get(sphere.uuid);
            if (force) {
                sphere.position.add(force);
                force.multiplyScalar(0.95);

                if (force.length() < 0.01) {
                    forces.delete(sphere.uuid);
                }
            }

            const originalPos = sphere.userData.originalPosition;
            tempVector.set(originalPos.x, originalPos.y + breathingY, originalPos.z + breathingZ);
            sphere.position.lerp(tempVector, 0.018);
        });

        handleCollisions();
    }

    renderer.render(scene, camera);
}

window.addEventListener("mousemove", onMouseMove);
animate();

window.addEventListener("resize", () => {
    const width = heroContainer.clientWidth;
    const height = heroContainer.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

const dexterButton = document.getElementById('dexter-button');
const mybutton = dexterButton;

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    if (mybutton) mybutton.style.display = "block";
  } else {
    if (mybutton) mybutton.style.display = "none";
  }
}

if (mybutton) {
  mybutton.addEventListener('click', (event) => {
    event.preventDefault();
    // Scroll to top for Safari and other browsers
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function moveBackground(event) {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    document.body.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
        }