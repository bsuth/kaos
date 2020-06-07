/*
 * Kaos
 * Copyright (C) 2020 Brian Sutherland (bsuth)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default {
    home: {
        play: 'プレイ',
        scores: 'スコア',
        settings: '設定',
    },
    modes: {
        timed: {
            label: 'タイム',
            description: '生き延びる。',
        },
        spin: {
            label: '回転ヒーロー',
            description: '全回転すると点数集まる。',
        },
        collector: {
            label: 'コレクター',
            description: '同色玉集める。',
        },
    },
    howtoplay: `
        動きと回転と色を変わることができます。<br>
        プレーヤーの色と違う玉触ったら、ゲームが終わります。<br>
        うちのゲームモードをクリックするとゲームが始まります。
    `,
};
