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
        settings: 'コントロール',
    },
    modes: {
        timed: {
            label: 'タイム',
            description: 'できるまで生き延びる。',
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
        xbox: 'Xbox',        
        playstation: 'プレーステーション',        
        mobile: 'モビール',        
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
    about: `
        <p>
            Kaosはゲーム開発について習いたい兄弟から開発されたウェブゲームです。
            概念と試作はコロナ検疫間に生まれました。
            <a href='https://developer.mozilla.org/ja/docs/Web/API/Canvas_API'>
                Canvas API
            </a>
            を用いる仕組みがあって、フロントエンドに
            <a href='https://vuejs.org/'>VueJS</a>
            が使われています。
        </p>
        <p>
            僕たちはKaos開発をよく楽しんでて、プレヤーも楽しめなら開発に足ります。
            お時間をいただきありがとうございます。
        </p>
        <br />
        <p>開発元</p>
    `,
};
