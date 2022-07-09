import React from 'react';
import { DarklySafeAreaView, DarklyText } from 'rn-darkly';
import { ActionSheet } from './library/main';

export default function App() {
  const [visible, setVisible] = React.useState(false);

  return (
    <DarklySafeAreaView>
      <DarklyText
        onPress={() => {
          ActionSheet.show(
            'action sheet',
            new Array(30).fill(0).map((v, i) => {
              return {
                text: 'action sheet item' + i,
              };
            }),
          );
        }}
        dark_style={{ color: '#eee' }}>
        show action sheet
      </DarklyText>
      <DarklyText
        onPress={() => {
          ActionSheet.show({
            title: 'action sheet custom',
            actions: new Array(3).fill(0).map((v, i) => {
              return {
                text: 'action sheet item' + i,
              };
            }),
          });
        }}
        dark_style={{ color: '#eee' }}>
        show action sheet custom
      </DarklyText>
      <DarklyText
        onPress={() => setVisible(!visible)}
        dark_style={{ color: '#eee' }}>
        show action sheet2
      </DarklyText>
      <ActionSheet
        forceDark
        visible={visible}
        onChange={setVisible}
        title="action sheet2"
        actions={new Array(30).fill(0).map((v, i) => {
          return {
            text: 'action sheet item' + i,
          };
        })}
      />
    </DarklySafeAreaView>
  );
}
