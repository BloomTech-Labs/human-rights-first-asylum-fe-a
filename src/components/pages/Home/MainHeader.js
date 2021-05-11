import React from 'react';
import HRFLogo from './HRFlogo.png';

import { PageHeader } from 'antd';

export default function MainHeader() {
  return (
    <PageHeader
      className="site-page-header"
      title="Title"
      subTitle="This is a subtitle"
    />
  );
}
