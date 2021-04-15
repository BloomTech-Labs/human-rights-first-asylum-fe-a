import React from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function CaseOverviewCard() {
  return (
    <div>
      <Card style={{ width: 300 }}>
        <Meta title="testing" />
      </Card>
    </div>
  );
}
