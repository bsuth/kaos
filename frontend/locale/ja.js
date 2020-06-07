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
            description: '全回転すると点数がとれる。',
        },
        collector: {
            label: 'コレクター',
            description: '同色玉を集める。',
        },
    },
    leaderboard: {
        date: '年月日',
        score: 'スコア',
    },
    settings: {
        keyboard: 'キーボード',        
    },
    howtoplay: `
        動きと回転と色を変わることができます。<br>
        プレーヤーの色と異なる玉触れたら、ゲームが終わります。<br>
        ゲームモードをクリックするとゲームが始まります。
    `,
    footer: {
        about: 'kaos について',        
    },
    pause: {
        resume: '続ける',        
        quit: '辞める',        
    },
    gameover: {
        gameover: 'ゲームオーバー',
        score: 'スコア：',
        restart: 'リスタート',        
        quit: '辞める',        
    },
    hud: {
        nextcolor: '次の色：',
        score: 'スコア：',
    },
};
