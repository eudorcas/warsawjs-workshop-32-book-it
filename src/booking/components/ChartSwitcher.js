import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const ChartSwitcher = ({ isChartVisible, switchChartVisible }) => {
  return (
    <Checkbox
      checked={isChartVisible}
      onChange={() => switchChartVisible(!isChartVisible)}
      toggle
      label="Pokaż wykres"
    />
  );
};
export default ChartSwitcher;
