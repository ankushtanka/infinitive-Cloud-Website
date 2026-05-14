import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Sparkles, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

type Active = "hero" | "infra" | "network" | "security" | "performance" | "cta";

interface Props {
  scrollRef: MutableRefObject<number>; // 0..1
  mouse: { x: number; y: number };
  active: Active;
}

/** Camera waypoints per section (position + lookAt). */
const WAYPOINTS: Record<Active, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  hero:        { pos: new THREE.Vector3(0,  0.4,   9), look: new THREE.Vector3(0, 0, 0) },
  infra:       { pos: new THREE.Vector3(0,  0.6,   3.2), look: new THREE.Vector3(0, 0.4, -4) },
  network:     { pos: new THREE.Vector3(2.5, 1.2, 6),   look: new THREE.Vector3(0, 0, 0) },
  security:    { pos: new THREE.Vector3(-1.5, 0.5, 5),  look: new THREE.Vector3(0, 0, 0) },
  performance: { pos: new THREE.Vector3(0, 1.8,   7),   look: new THREE.Vector3(0, 0, 0) },
  cta:         { pos: new THREE.Vector3(0, 0,    11),   look: new THREE.Vector3(0, 0, 0) },
};

/** Smooth scroll-driven camera + scene visibility controller. */
const Scene3D = ({ scrollRef, mouse, active }: Props) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.4, 9));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  const heroGroup = useRef<THREE.Group>(null!);
  const rackGroup = useRef<THREE.Group>(null!);
  const networkGroup = useRef<THREE.Group>(null!);
  const shieldGroup = useRef<THREE.Group>(null!);
  const perfGroup = useRef<THREE.Group>(null!);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Update target waypoint based on active section
    const wp = WAYPOINTS[active];
    targetPos.current.copy(wp.pos);
    targetLook.current.copy(wp.look);

    // Add subtle parallax from mouse
    const px = mouse.x * 0.5;
    const py = mouse.y * 0.3;

    camera.position.lerp(
      new THREE.Vector3(targetPos.current.x + px, targetPos.current.y + py, targetPos.current.z),
      Math.min(1, dt * 1.6)
    );
    currentLook.current.lerp(targetLook.current, Math.min(1, dt * 1.6));
    camera.lookAt(currentLook.current);

    // Hero floating server
    if (heroGroup.current) {
      heroGroup.current.rotation.y = t * 0.15;
      heroGroup.current.position.y = Math.sin(t * 0.6) * 0.15;
      heroGroup.current.visible = active === "hero" || active === "cta";
      const heroScale = active === "hero" ? 1 : active === "cta" ? 0.6 : 0.001;
      heroGroup.current.scale.lerp(new THREE.Vector3(heroScale, heroScale, heroScale), 0.05);
    }

    // Rack hallway visible during infra
    if (rackGroup.current) {
      rackGroup.current.visible = active === "infra";
    }

    // Network globe
    if (networkGroup.current) {
      networkGroup.current.rotation.y = t * 0.1;
      networkGroup.current.visible = active === "network";
    }

    // Shield
    if (shieldGroup.current) {
      shieldGroup.current.rotation.y = t * 0.25;
      shieldGroup.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      shieldGroup.current.visible = active === "security";
    }

    // Performance grid
    if (perfGroup.current) {
      perfGroup.current.rotation.x = -0.3;
      perfGroup.current.rotation.z = t * 0.05;
      perfGroup.current.visible = active === "performance";
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#7dd3fc" />
      <pointLight position={[-6, -2, 4]} intensity={1.2} color="#a855f7" distance={20} decay={2} />
      <pointLight position={[0, 2, 6]}  intensity={1.5} color="#22d3ee" distance={18} decay={2} />

      {/* Persistent atmosphere */}
      <Stars radius={80} depth={50} count={2200} factor={3.5} saturation={0} fade speed={0.6} />
      <Sparkles count={120} scale={[20, 12, 20]} size={2.5} speed={0.4} color="#22d3ee" opacity={0.7} />

      {/* === HERO: floating cloud server === */}
      <group ref={heroGroup}>
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
          <FuturisticServer />
        </Float>
      </group>

      {/* === INFRA: server rack hallway === */}
      <group ref={rackGroup}>
        <ServerHallway />
      </group>

      {/* === NETWORK === */}
      <group ref={networkGroup}>
        <NetworkGlobe />
      </group>

      {/* === SECURITY === */}
      <group ref={shieldGroup}>
        <SecurityShield />
      </group>

      {/* === PERFORMANCE === */}
      <group ref={perfGroup}>
        <PerformanceGrid />
      </group>
    </>
  );
};

/* ============================================================
 * Hero — Floating futuristic cloud server
 * ============================================================ */
const FuturisticServer = () => {
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ringRef.current) ringRef.current.rotation.z = s.clock.elapsedTime * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x = s.clock.elapsedTime * 0.3;
  });
  return (
    <group>
      {/* core cube */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial
          color="#0b1230"
          metalness={0.95}
          roughness={0.15}
          emissive="#0ea5e9"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* glowing inner core */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      {/* edge LEDs */}
      {[-0.81, 0.81].map((y) =>
        [-0.81, 0.81].map((x) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.81]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
          </mesh>
        ))
      )}
      {/* orbiting rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.4, 0.012, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.7, 0.008, 16, 100]} />
        <meshBasicMaterial color="#a855f7" toneMapped={false} />
      </mesh>
      <Sparkles count={60} scale={5} size={3} speed={0.6} color="#22d3ee" />
    </group>
  );
};

/* ============================================================
 * Infra — corridor of server racks
 * ============================================================ */
const ServerHallway = () => {
  const racks = useMemo(() => {
    const arr: Array<{ pos: [number, number, number]; key: string }> = [];
    for (let i = 0; i < 14; i++) {
      arr.push({ pos: [-2.4, 0, -i * 2.2], key: `L${i}` });
      arr.push({ pos: [2.4, 0, -i * 2.2], key: `R${i}` });
    }
    return arr;
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, -14]} receiveShadow>
        <planeGeometry args={[20, 60]} />
        <meshStandardMaterial color="#04060f" metalness={0.9} roughness={0.4} />
      </mesh>
      {/* ceiling strip lights */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0, 2.6, -i * 2.2]}>
          <boxGeometry args={[0.6, 0.04, 0.04]} />
          <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        </mesh>
      ))}
      {racks.map((r) => (
        <ServerRack key={r.key} position={r.pos} seed={parseInt(r.key.slice(1))} />
      ))}
    </group>
  );
};

const ServerRack = ({ position, seed }: { position: [number, number, number]; seed: number }) => {
  const lightsRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!lightsRef.current) return;
    lightsRef.current.children.forEach((c, i) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.4 + Math.abs(Math.sin(s.clock.elapsedTime * 2 + i + seed)) * 0.6;
      m.transparent = true;
    });
  });
  return (
    <group position={position}>
      {/* rack body */}
      <mesh>
        <boxGeometry args={[1.2, 2.4, 0.6]} />
        <meshStandardMaterial color="#0a1020" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* slots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 1 - i * 0.28, 0.31]}>
          <boxGeometry args={[1.05, 0.18, 0.02]} />
          <meshStandardMaterial color="#020410" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}
      {/* blinking LEDs */}
      <group ref={lightsRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0.42, 1 - i * 0.28, 0.33]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#a855f7" : "#22d3ee"} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/* ============================================================
 * Network — globe of nodes connected by glowing lines
 * ============================================================ */
const NetworkGlobe = () => {
  const { nodes, lines } = useMemo(() => {
    const N = 36;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(2.4));
    }
    // build line segments to nearest 2 neighbours
    const segs: number[] = [];
    pts.forEach((p, i) => {
      const dists = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        segs.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z);
      });
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));
    return { nodes: pts, lines: geo };
  }, []);

  const pulseRef = useRef<THREE.LineBasicMaterial>(null!);
  useFrame((s) => {
    if (pulseRef.current) {
      pulseRef.current.opacity = 0.35 + Math.abs(Math.sin(s.clock.elapsedTime * 1.2)) * 0.5;
    }
  });

  return (
    <group>
      {/* wire globe */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.18} />
      </mesh>
      {/* node spheres via instances */}
      <Instances limit={nodes.length}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
        {nodes.map((p, i) => (
          <Instance key={i} position={[p.x, p.y, p.z]} />
        ))}
      </Instances>
      {/* connection lines */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial ref={pulseRef} color="#a855f7" transparent opacity={0.6} toneMapped={false} />
      </lineSegments>
      <Sparkles count={80} scale={6} size={2.5} speed={0.6} color="#a855f7" />
    </group>
  );
};

/* ============================================================
 * Security — hexagonal shield dome with scan lines
 * ============================================================ */
const SecurityShield = () => {
  const scanRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (scanRef.current) {
      const t = (s.clock.elapsedTime % 3) / 3;
      scanRef.current.position.y = -1.5 + t * 3;
      const m = scanRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = (1 - Math.abs(t - 0.5) * 2) * 0.6;
    }
  });
  return (
    <group>
      {/* outer dome */}
      <mesh>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.22} />
      </mesh>
      {/* inner solid faint */}
      <mesh>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshStandardMaterial
          color="#0b1230"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          transparent
          opacity={0.18}
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>
      {/* core lock */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.6}
            metalness={0.9}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
      </Float>
      {/* scan plane */}
      <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2.2, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <Sparkles count={60} scale={5} size={2} speed={0.5} color="#22d3ee" />
    </group>
  );
};

/* ============================================================
 * Performance — animated grid + bars
 * ============================================================ */
const PerformanceGrid = () => {
  const barsRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (!barsRef.current) return;
    barsRef.current.children.forEach((c, i) => {
      const m = c as THREE.Mesh;
      const h = 0.4 + Math.abs(Math.sin(s.clock.elapsedTime * 1.5 + i * 0.7)) * 1.6;
      m.scale.y = h;
      m.position.y = h / 2;
    });
  });
  return (
    <group position={[0, -0.5, -1]}>
      {/* grid plane */}
      <gridHelper args={[12, 24, "#22d3ee", "#1e293b"]} position={[0, -0.05, 0]} />
      <group ref={barsRef}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} position={[(i - 4) * 0.6, 0, 0]}>
            <boxGeometry args={[0.3, 1, 0.3]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <Sparkles count={50} scale={[10, 4, 6]} size={2} speed={0.7} color="#a855f7" />
    </group>
  );
};

export default Scene3D;
