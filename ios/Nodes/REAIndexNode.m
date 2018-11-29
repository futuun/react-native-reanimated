#import "REAIndexNode.h"
#import "REANodesManager.h"

@implementation REAIndexNode {
    NSArray<REANodeID> *_array;
    NSNumber *_index;
}

- (instancetype)initWithID:(REANodeID)nodeID config:(NSDictionary<NSString *,id> *)config
{
    if ((self = [super initWithID:nodeID config:config])) {
        _array = config[@"array"];
        _index = config[@"index"];
    }
    return self;
}

- (id)evaluate
{
    int index = [[[self.nodesManager findNodeByID:_index] value] intValue];

    if (index < 0 || index >= [_array count]) {
        RCTLogError(@"[indexNode] out of range, index = %d, length = %lu", index, [_array count]);
        return NULL;
    }

    return [[self.nodesManager findNodeByID:[_array objectAtIndex:index]] value];
}

@end
