import _ from 'lodash';
import React from 'react';

import esi from '../esi';
import Bar from './Bar';

const RANGE_LENGTH = 3;

function Foo() {
  return <ul>{_.range(RANGE_LENGTH).map((k) => <Bar key={k}>{`Bar ${k}`}</Bar>)}</ul>;
}

export default esi('http://localhost:8888/esi/Foo')(Foo);
