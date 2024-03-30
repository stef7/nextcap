"use client";

import { v4 as uuidv4 } from "uuid";
import type { CmsWidgetControlProps } from "decap-cms-core";
import React from "react";

export class UuidWidget extends React.Component<CmsWidgetControlProps<string | undefined>> {
  render() {
    const { classNameWrapper, forID, onChange, value } = this.props;
    if (!value) {
      onChange(uuidv4());
      return "Loading...";
    }
    return (
      <input
        className={classNameWrapper}
        id={forID}
        type="text"
        readOnly
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
}
