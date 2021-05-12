import React from 'react';
import HRFLogo from './HRFlogo.png';
import './_MainHeader.less';

export default function MainHeader() {
  return (
    <div className="site-page-header">
      <img src={HRFLogo} alt="HRF Logo" />
    </div>
  );
}
