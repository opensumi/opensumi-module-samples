import * as React from 'react';
import { ConfigProvider, Button, Tooltip, Select, Steps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import '@opensumi/antd-theme/lib/index.css';
import * as styles from './components.module.less';
const { Option } = Select;
const { Step } = Steps;

export const AntdComponentsSampleView = (...params) => {
  const ref = React.useRef<any>(null);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.components_wrap} ref={ref}>
      <ConfigProvider prefixCls="sumi_antd" getPopupContainer={() => ref.current}>
        <h1 className={styles.title}>Button</h1>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="primary" shape="circle">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <br />
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Tooltip title="search">
          <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="dashed" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button icon={<SearchOutlined />} href="https://www.google.com" />
        <br />
        <br />
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button type="primary" shape="circle" size="large">
          A
        </Button>
        <Button type="primary" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <br />
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Tooltip title="search">
          <Button type="dashed" shape="circle" icon={<SearchOutlined />} size="large" />
        </Tooltip>
        <Button type="dashed" icon={<SearchOutlined />} size="large">
          Search
        </Button>
        <Button icon={<SearchOutlined />} size="large" href="https://www.google.com" />
        <h1 className={styles.title}>Select</h1>
        <Select defaultValue="lucy" style={{ width: 120 }} animation={''} onChange={handleChange} onBlur={(e) => console.log('blur => ', e)}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <h1 className={styles.title}>Steps</h1>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </ConfigProvider>
    </div>
  );
};
