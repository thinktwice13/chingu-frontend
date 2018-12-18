import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-0somponents';

const Button = props => {
  const { children, href, ...restProps } = props;

  const Component = href ? 'a' : 'button';

  return (
    <Component href={href} rel={rel} target={target} {...restProps}>
      {children}
    </Component>
  );
};

class Node {
  constructor(name, clusters, data) {
    this.name = name;
    this.children = [];
  }

  add(data) {
    if (data.options) {
      const [currentCluster, ...restClusters] = clusters;

      for (const option of data.options)
      this.children.push(new Node(data.name, restClusters, data.filter(data.condition)));

      // TEMP
      if (this.children.length < 4) {
        for (const child of this.children) {
          parent.add(data)
        }
        parent.matchPool()
      }
    } else {
      this.children.push(data);
    }
  }

  matchPool() {
    /**
     * iterate through children and calculate possible matches. Only consider ndoes within desired timezone range.
     * ISSUE: How to include teams? Include all of them from the same cluster level 
     */
    for (const ref of this.children) {
      for (const against of this.children) {
        const score = calcMatchScore(ref, against)

        /**
         * Sum scores
         * Strat joining by four and remove joined from pool.
         * Stop joining at desired match score (default 0.6)
         * Concat
         */
      }
    }
  }
}

/**
 * Pass in the parent and when there are fewer than maxMemberCount of nodes available, return nodes to parent node's pool. Rerun matching (performance opt: only run for new nodes!)
 * 
 * 
 */