import React from "react";

import { LogoName } from "./Logo.enum";

import "./Logo.scss";

const { logo } = LogoName;

export const Logo = () => <div className="logo">{logo}</div>;
