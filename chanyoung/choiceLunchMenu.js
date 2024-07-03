//여러 점심 메뉴 후보 중에서 랜덤으로 메뉴를 골라 주는 코드

function pick(menus) {
  //pick이라는 함수는 랜덤으로 정해진 메뉴를 작업 성공 결과로 가진 Promise 객체를 리턴하는 함수.
  //만약 메뉴 후보 리스트의 길이가 0이라면 Need Candidates!(후보 메뉴들이 필요합니다!)라는 메시지를 가진 에러 객체를 생성하고 그것을 reject() 함수의 파라미터로 전달하고 실행한다.
  console.log("Pick random menu!");
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error("Need Candidates!"));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        // *실습 퀴즈 부분*
        //Promise 객체를 직접 만들 때, 생성된 Promise 객체를 fulfilled 상태로 만들어주는 함수는 resolve 함수이다. 그리고 resolve 함수의 파라미터로 적어 성공 결과를 전달하면 된다.
        resolve(selectedMenu);
      }, 1000); // 시간이 걸리는 걸 시뮬레이션하기 위한 1초
    }
  });
  return p;
}

function getRandomMenu() {
  //메뉴 후보 리스트 URL
  return fetch("https://learn.codeit.kr/api/menus")
    .then((response) => response.json())
    .then((result) => {
      const menus = result;
      return pick(menus); // ! random pick function
    });
}

getRandomMenu()
  .then((menu) => {
    console.log(`Today's lunch is ${menu.name} ~`);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Random Menu candidates change everyday");
  });
