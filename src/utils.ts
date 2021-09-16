// Source code for the Substrate Telemetry Server.
// Copyright (C) 2021 Parity Technologies (UK) Ltd.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import { Types } from './common';

export interface Viewport {
  width: number;
  height: number;
}

export function formatNumber(num: number): string {
  const input = num.toString();

  let output = '';
  let length = input.length;

  while (length > 3) {
    output = ',' + input.substr(length - 3, 3) + output;
    length -= 3;
  }

  output = input.substr(0, length) + output;

  return output;
}

export function trimHash(hash: string, length: number): string {
  if (hash.length < length) {
    return hash;
  }

  const side = ((length - 2) / 2) | 0;

  return hash.substr(0, side) + '..' + hash.substr(-side, side);
}

export function milliOrSecond(
  num: Types.Milliseconds | Types.PropagationTime
): string {
  if (num < 10000) {
    return `${num}ms`;
  }

  return `${(num / 1000) | 0}s`;
}

export function secondsWithPrecision(num: number): string {
  const intString = (num | 0).toString();
  const intDigits = intString.length;

  switch (intDigits) {
    case 1:
      return num.toFixed(3) + 's';
    case 2:
      return num.toFixed(2) + 's';
    case 3:
      return num.toFixed(1) + 's';
    default:
      return intString + 's';
  }
}

export interface HashData {
  tab?: string;
  chain?: Types.GenesisHash;
}