import React from 'react';
import Grid from '../../packages/grid/lib';

const {Row, Col, Wrap} = new Grid({
    gridNum: 6,
    gutterInside: 12,
    gutterOutSide: 16
});

export default Grid;
export {Row, Col, Wrap};
