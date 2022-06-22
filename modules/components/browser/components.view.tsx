import * as React from 'react';
import { Dropdown } from '@opensumi/ide-components/lib/dropdown';
import { Button } from '@opensumi/ide-components'

import * as styles from './components.module.less';


const Drop = Dropdown as any;

export const ComponentsSampleView = () => {
  return (
    <div className={styles.components_wrap}>
      <h1 className={styles.title}>Dropdown</h1>
      <Drop className={'kt-menu'} overlay={<div className={styles.menu_item}>I'm a Menu Item</div>} trigger={['click']}>
        <Button>Click Dropdown Menu</Button>
      </Drop>
    </div>
  );
};
