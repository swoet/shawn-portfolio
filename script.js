import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.148/build/three.module.js';
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000),renderer=new THREE.WebGLRenderer({canvas:document.getElementById('bg'),alpha:true});
renderer.setPixelRatio(devicePixelRatio);renderer.setSize(innerWidth,innerHeight);camera.position.setZ(30);
const geo=new THREE.BoxGeometry(),mat=new THREE.MeshStandardMaterial({color:0x4db8ff}),cube=new THREE.Mesh(geo,mat);scene.add(cube);
const light=new THREE.PointLight(0xffffff,1);light.position.set(10,10,10);scene.add(light),scene.add(new THREE.AmbientLight(404040));
function animate(){requestAnimationFrame(animate);cube.rotation.x+=.01,cube.rotation.y+=.01,renderer.render(scene,camera);}animate();
window.addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});