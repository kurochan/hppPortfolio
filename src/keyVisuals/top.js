import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { css } from '@emotion/core';

const theme = css`
	width: 100vw;
	height: 100vh;
	background-color: #000;
`;

const vertexSource = `
precision mediump float;
uniform float time;
uniform float randx;
uniform float randy;
uniform float randz;
attribute vec4 color;
varying vec4 vColor;
varying vec3 pos;

void main() {
	vColor = color;
	pos = vec3(
		position.x * ( 1. / time + cos(randx + position.x) * position.x * sin(1. + position.z * time) * cos(1.2 * position.x * sin(cos(position.z + 0.01 * sin(0.5 * time + randx))) + sin(cos(0.5 * time) * position.y))),
		position.y * (1. / time + sin(randy + position.z + 0.5 * time - randy) * position.y * cos(0.001*0.5 * time + position.z + sin(cos(sin(1. - sin(0.5 * time) * cos(0.5 * time)) + sin(0.5 * time)) + sin(cos(0.5 * time)) + 0.5 * time * sin(position.y))) * cos(position.x * cos(sin(0.5 * time)))),
		position.z * (1. / abs(0.5 * time - 100.) + cos(randz + 0.0025*0.5 * time) * position.z + sin(sin(position.y * sin(cos(0.5 * time) + 0.5 * time * sin(position.y)) * cos(position.x * cos(sin(0.5 * time))))))
		);
	gl_PointSize = 1.5;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

//gl_Position = vec4(tmp.x * sin(tmp.y + tmp.z * time / randx + tmp.y) * atan(time), sin(tmp.y * cos(tmp.z) - 0.001 * time * acos(tmp.x)), tmp.z * sin(atan(tmp.x * time / randx + tmp.y)), 1.0);

const fragmentSource = `
precision mediump float;
uniform float time;
varying vec4 vColor;
varying vec3 pos;
void main() {
	gl_FragColor = vec4(
		vColor.r * abs(sin(time*0.4 + pos.z) + pos.x),
		vColor.g * abs(cos(time*0.4 - vColor.b) + pos.z),
		vColor.b * abs(sin(time*0.4 - pos.x) / abs(sin(time*0.4 - vColor.b)) + abs(cos(time*0.4 - vColor.r))),
		1.0
		);
}
`;

const Thing = () => {
	const ref = useRef();

	const uniforms = {
		time: {
			value: 0.0
		},
		randx: {
			value: 1 + Math.random()
		},
		randy: {
			value: 1 + Math.random()
		},
		randz: {
			value: 1 + Math.random()
		}
	};

	const [positions, colors] = useMemo(() => {
		let positions = [];
		let colors = [];
		let x, y, z;
		for (let i = 0; i < 75000; i++) {
			x = Math.random() * 2.0 - 1.0;
			y = Math.random() * 2.0 - 1.0;
			z = Math.random() * 2.0 - 1.0;

			positions.push(x);
			positions.push(y);
			positions.push(z);
			colors.push(Math.random() * 255.0);
			colors.push(Math.random() * 255.0);
			colors.push(Math.random() * 255.0);
			colors.push(Math.random() * 255.0);
		}
		return [positions, colors];
	}, []);

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		uniforms.time.value = time;
		ref.current.rotation.x += (Math.PI / 720) * Math.sin(0.01 * time);
		ref.current.rotation.y += Math.PI / 1440;
	});

	return (
		<points ref={ref}>
			<bufferGeometry attach='geometry'>
				<bufferAttribute
					attachObject={['attributes', 'position']}
					count={positions.length / 3}
					array={new Float32Array(positions)}
					itemSize={3}
				/>
				<bufferAttribute
					attachObject={['attributes', 'color']}
					count={colors.length / 4}
					array={new Uint8Array(colors)}
					itemSize={4}
					normalized
				/>
			</bufferGeometry>
			<shaderMaterial
				attach='material'
				vertexShader={vertexSource}
				fragmentShader={fragmentSource}
				uniforms={uniforms}
				side={THREE.DoubleSide}
				transparent
			/>
		</points>
	);
};

const TopArt = () => (
	<div css={theme}>
		<Canvas
			camera={{
				position: [0, 0, 1]
			}}
			shadowMap
		>
			<Thing />
		</Canvas>
	</div>
);

export default TopArt;