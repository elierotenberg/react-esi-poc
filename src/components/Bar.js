import React from 'react';

import esi from '../esi';

function Bar({ children }) {
  return <li className='Bar'>{children}</li>;
}
Bar.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default esi('http://localhost:8888/esi/Bar')(Bar);
