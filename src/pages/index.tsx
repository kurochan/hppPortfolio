import React from 'react';
import { Layout } from '../layouts';
import {
	About,
	Intro,
	Events,
	Skills,
	TopMessage,
	Background
} from '../internal/index';
import styled from '@emotion/styled';
import { PageBaseTheme } from '../themes';

const Theme = styled(PageBaseTheme)``;

export default () => (
	<Layout>
		<h1>This is Blog branch</h1>
		<Background />
	</Layout>
);
