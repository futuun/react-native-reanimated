package com.swmansion.reanimated.nodes;

import com.facebook.react.bridge.ReadableMap;
import com.swmansion.reanimated.NodesManager;
import com.swmansion.reanimated.Utils;

public class IndexNode extends Node {

    private final int[] mArray;
    private final int mIndex;

    public IndexNode(int nodeID, ReadableMap config, NodesManager nodesManager) {
        super(nodeID, config, nodesManager);
        mArray = Utils.processIntArray(config.getArray("array"));
        mIndex = config.getInt("index");
    }

    @Override
    protected Object evaluate() {
        int index = ((Double) mNodesManager.getNodeValue(mIndex)).intValue();

        if (index < 0 || index >= mArray.length) {
            throw new IllegalArgumentException("[indexNode] out of range, index = " + index + ", length = " + mArray.length);
        }

        return mNodesManager.getNodeValue(mArray[index]);
    }
}
