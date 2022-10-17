import * as React from 'react';
import { Dropdown } from '@opensumi/ide-components/lib/dropdown';
import { Button, Select, Option, Dialog } from '@opensumi/ide-components'

import * as styles from './components.module.less';


const Drop = Dropdown as any;

export const ComponentsSampleView = () => {
  const [selected, setSelected] = React.useState<string>('lucy');
  const [visible, setVisible] = React.useState<boolean>(false);
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
      <h1 className={styles.title}>Dialog</h1>
      <Button onClick={() => { setVisible(true) }}>Show Dialog</Button>
      <Dialog visible={visible} message={'demo'} buttons={[
        <Button style={{ marginTop: 20 }} onClick={() => { setVisible(false) }}>OK</Button>,
        <Button style={{ marginTop: 20 }} onClick={() => { setVisible(false) }}>Cancel</Button>
      ]}></Dialog>
    </div>
  );
};
