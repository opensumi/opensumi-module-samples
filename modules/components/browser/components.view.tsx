import * as React from 'react';
import { Dropdown } from '@opensumi/ide-components/lib/dropdown';
import { Button, Select, Option } from '@opensumi/ide-components'

import * as styles from './components.module.less';


const Drop = Dropdown as any;

export const ComponentsSampleView = () => {
  const [selected, setSelected] = React.useState<string>('lucy');
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelected(value);
  };
  return (
    <div className={styles.components_wrap}>
      <h1 className={styles.title}>Dropdown</h1>
      <Drop className={'kt-menu'} overlay={<div className={styles.menu_item}>I'm a Menu Item</div>} trigger={['click']}>
        <Button>Click Dropdown Menu</Button>
      </Drop>
      <h1 className={styles.title}>Select</h1>
      <Select value={selected} className={styles.select} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
    </Select>
    </div>
  );
};
