import React from 'react';
import { DarklySafeAreaView, DarklyText } from 'rn-darkly';
import { ActionSheet } from './library/main';

export default function App() {
  return (
    <DarklySafeAreaView>
      <DarklyText
        onPress={() => {
          ActionSheet.show(
            'action sheet',
            new Array(3).fill(0).map((v, i) => {
              return {
                text: 'action sheet item' + i,
              };
            }),
          );
        }}
        darkStyle={{ color: '#eee' }}>
        show action sheet
      </DarklyText>
    </DarklySafeAreaView>
  );
}
