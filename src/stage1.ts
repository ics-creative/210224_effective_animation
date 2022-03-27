import { appendAll, createElementsWithClass, removeAll } from "./utils";

// stage1
const STAGEID = "stage1";
const stage = document.querySelector(`#${STAGEID}`)!;
const center = document.querySelector(`#${STAGEID} .center`)!;
const star = document.querySelector(`#${STAGEID} .star`)!;

const popCenterStar = async () => {
  // 中央の星を縮める
  await star.animate([{ transform: `scale(1)` }, { transform: `scale(0.6)` }], {
    duration: 150
  }).finished;

  // 中央の星を下の大きさに戻す
  // このアニメーションは完了を待たずに次の処理に移る
  star.animate([{ transform: `scale(0.6)` }, { transform: `scale(1)` }], {
    duration: 500,
    easing: "ease-out"
  });
};

// クリック時のアニメーション
const emitParticles = async () => {
  await popCenterStar();

  // div.dotをCOUNT個作成
  const COUNT = 10;
  const dots = createElementsWithClass(COUNT, "div", "dot");
  appendAll(center, dots); // 画面に表示

  const animations = dots.map((dot, index) => {
    const angle = (360 / COUNT) * index;
    return dot.animate(
      [
        {
          transform: `rotate(${angle}deg) translateX(0px)`,
          opacity: 1
        },
        {
          transform: `rotate(${angle}deg) translateX(100px)`,
          opacity: 1,
          offset: 0.8
        },
        {
          transform: `rotate(${angle}deg) translateX(100px)`,
          opacity: 0
        }
      ],
      {
        duration: 500
      }
    );
  });

  // 全てのアニメーションが終わるまで待つ
  await Promise.all(animations.map((anim) => anim.finished));
  removeAll(dots); // 削除
};

// クリックでアニメーションを実行
stage?.addEventListener("click", emitParticles);
