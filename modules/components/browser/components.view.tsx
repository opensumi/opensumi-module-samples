import * as React from 'react';
import { Dropdown } from '@opensumi/ide-components/lib/dropdown';
import { Button, Select, Option, BasicRecycleTree, IBasicTreeData, IBasicInlineMenuPosition, Dialog } from '@opensumi/ide-components'

import * as styles from './components.module.less';
import { useInjectable } from '@opensumi/ide-core-browser';
import { IIconService } from '@opensumi/ide-theme';


const Drop = Dropdown as any;

export const ComponentsSampleView = () => {
  const iconService = useInjectable<IIconService>(IIconService);
  const treenodeCounter = React.useRef<number>(0);
  const [selected, setSelected] = React.useState<string>('lucy');
  const [visible, setVisible] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelected(value);
  };
  const inlineMenus = [
    {
      icon: 'message',
      title: 'Message',
      command: 'message',
      position: IBasicInlineMenuPosition.TREE_NODE,  // Menus on the TreeNode
    },
    {
      icon: 'arrowup',
      title: 'Up',
      command: 'arrowup',
      position: IBasicInlineMenuPosition.TREE_NODE,  // Menus on the TreeNode
    },
    {
      icon: 'minus',
      title: 'Minus',
      command: 'minus',
      position: IBasicInlineMenuPosition.TREE_NODE,  // Menus on the TreeNode
    },
    {
      icon: 'step-out',
      title: 'StepOut',
      command: 'step-out',
      position: IBasicInlineMenuPosition.TREE_CONTAINER,  // Menus on the TreeNode Container (has children or expanded property)
    },
  ];
  const contextMenus = [
    {
      title: 'Message',
      id: 'message',
      group: 'message',
    },
    {
      id: 'new_file',
      title: 'New File',
      group: 'operator'
    },
    {
      id: 'new_folder',
      title: 'New Folder',
      group: 'operator'
    },
  ];
  const inlineMenuActuator = (item, action) => {
    console.log(item, action)
  };
  const contextMenuActuator = (item, action) => {
    console.log(item, action)
  };
  const resolveChildren = (node?: IBasicTreeData) => {
    return [
      {
        label: `node ${treenodeCounter.current ++}`,
        children: [],
        // CDN icon
        iconClassName: iconService.fromIcon('', `https://img.alicdn.com/imgextra/i2/O1CN01yJI0Je20XTPIuU6or_!!6000000006859-2-tps-128-128.png`)
      },
      {
        label: `node ${treenodeCounter.current ++}`,
        // Buitin icon, see https://opensumi.github.io/core/
        icon: 'smile',
      },
      {
        label: `node ${treenodeCounter.current ++}`,
        icon: 'smile',
      },
    ]
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
      <h1 className={styles.title}>Basic TreeView</h1>
      <BasicRecycleTree 
        width={400}
        height={200}
        inlineMenus={inlineMenus}
        inlineMenuActuator={inlineMenuActuator}
        contextMenus={contextMenus}
        contextMenuActuator={contextMenuActuator}
        resolveChildren={resolveChildren}
      />
      <h1 className={styles.title}>Dialog</h1>
      <Button onClick={() => { setVisible(true) }}>Show Dialog</Button>
      <Dialog visible={visible} message={'demo'} buttons={[
        <Button style={{ marginTop: 20 }} onClick={() => { setVisible(false) }}>OK</Button>,
        <Button style={{ marginTop: 20 }} onClick={() => { setVisible(false) }}>Cancel</Button>
      ]}></Dialog>
    </div>
  );
};
