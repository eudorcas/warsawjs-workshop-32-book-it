import React from 'react';
import { Label } from 'semantic-ui-react';

import useHover from '../../utils/useHover';
import Hover from '../../utils/Hover';
import withHover from '../../utils/withHover';

const text = {
  LOW: 'niskie obłożenie',
  MEDIUM: 'średnie obłożenie',
  HIGH: 'wysokie obłożenie',
};

export const HotelDemandWithHook = props => {
  let [hoverRef, isHovered] = useHover();
  return (
    <span ref={hoverRef}>
      <HotelDemand showDetail={isHovered} {...props} />
    </span>
  );
};

export const HotelDemandWithRenderProps = props => {
  return (
    <Hover>
      {(hoverRef, isHovered) => (
        <span ref={hoverRef}>
          <HotelDemand showDetail={isHovered} {...props} />
        </span>
      )}
    </Hover>
  );
};

export const HotelDemandWithHOC = withHover(props => {
  const { hoverRef, isHovered, ...rest } = props;
  return (
    <span ref={hoverRef}>
      <HotelDemand showDetail={isHovered} {...rest} />
    </span>
  );
});

const HotelDemand = props => (
  <Label
    icon="building"
    content={props.showDetail ? text[props.demand] : props.demand}
  />
);

export default HotelDemandWithHOC;
