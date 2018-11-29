import AnimatedNode from './AnimatedNode';

export default class AnimatedIndex extends AnimatedNode {
  _index;
  _array;

  constructor(array, index) {
    super(
      {
        type: 'index',
        array: array.map(n => n.__nodeID),
        index: index.__nodeID,
      },
      [index, ...array]
    );
    this._index = index;
    this._array = array;
  }

  __onEvaluate() {
    return this._array[this._index];
  }
}
