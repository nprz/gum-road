window.addEventListener("load", (event) => {
  const starContainer = document.getElementById("star-container");

  function iterateChildren(container, cb) {
    for (let i = 0; i < container.children.length; i++) {
      cb(i);
    }
  }

  const values = {
    hoverValue: null,
    currentValue: null,
  };

  const valuesProxy = new Proxy(values, {
    set: (target, key, value) => {
      target[key] = value;
      if (key === "hoverValue" && value !== null) {
        iterateChildren(starContainer, (i) => {
          starContainer.children[i].style.color =
            i + 1 <= value ? "#ffb200" : "#646464";
        });
      } else {
        iterateChildren(starContainer, (i) => {
          starContainer.children[i].style.color =
            i + 1 <= valuesProxy.currentValue ? "#ffb200" : "#646464";
        });
      }
      return true;
    },
  });

  iterateChildren(starContainer, (i) => {
    starContainer.children[i].onclick = () =>
      (valuesProxy.currentValue = i + 1);
    starContainer.children[i].onmouseover = () =>
      (valuesProxy.hoverValue = i + 1);
    starContainer.children[i].onmouseout = () =>
      (valuesProxy.hoverValue = null);
  });
});
