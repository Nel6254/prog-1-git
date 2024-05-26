
var projectData = {
  "title": "Mans projekts",
  "pages": [
    {
      "title": "Mana pirmā lapa",
      "content": "Pievieno html saturu",
    },
  ],
};

var currentPage = null;

const loadProjectBtn = document.getElementById("loadProjectBtn");
const loadProjectInput = document.getElementById("loadProjectInput");
const saveProjectBtn = document.getElementById("saveProjectBtn");
const exportProjectBtn = document.getElementById("exportProjectBtn");
const createPageBtn = document.getElementById("createPageBtn");

const addPageBtn = document.getElementById("addPageBtn");
const editPageTitleBtn = document.getElementById("editPageTitleBtn");
const editProjTitleBtn = document.getElementById("editProjTitleBtn");

const pagelist = document.getElementById("pagelist"); 
const pageTitle = document.getElementById("pageTitle");
const projTitle = document.getElementById("projTitle");

loadProjectBtn.addEventListener(
  "click",
  () => {
    loadProjectInput.click();
  }
);
loadProjectInput.addEventListener(
  "change",
  () => {
    file = loadProjectInput.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      projectData = JSON.parse(reader.result);
      updateEditor();
      updatePage(0);
    };
    reader.readAsText(file);
  },
  false,
);
saveProjectBtn.addEventListener(
  "click",
  () => {
    savePage();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(projectData)));
    element.setAttribute('download', projectData["title"] + ".json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
);
exportProjectBtn.addEventListener(
  "click",
  () => {
    savePage();

    const templateHead = document.getElementById("exportTemplateHead").content;
    const templateBody = document.getElementById("exportTemplateBody").content;

    var title = document.createElement('title');
    title.textContent = projectData['title'];
    templateHead.appendChild(title);

    templateBody.getElementById('projTitle').textContent = projectData['title'];
    var pagelinks = projectData["pages"].map((page, index) => {
      var li = document.createElement('li')
      li.classList.add("nav-item");
      li.role = "presentation";
      var a = document.createElement('a')
      a.href = "#";
      a.textContent = page["title"];
      a.classList.add("nav-link", "text-white");
      if (index == 0) {
        a.classList.add("active");
      }
      a.dataset.bsToggle = "tab";
      a.dataset.bsTarget = "#page-" + index;
      li.appendChild(a);
      return li;
    });
    templateBody.getElementById("pageList").replaceChildren(...pagelinks);

    var pages = projectData["pages"].map((page, index) => {
      var div = document.createElement('div');
      if (index == 0) {
        div.classList.add("active");
      }
      div.classList.add("tab-pane");
      div.id = "page-" + index;
      div.role = "tabpanel";
      var pageTitle = document.createElement('h1');
      pageTitle.textContent = page["title"];

      hiddenQuill.setContents(page["content"]);
      var contentDiv = document.createElement('div')
      contentDiv.innerHTML = hiddenQuill.getSemanticHTML();
      
      div.replaceChildren(pageTitle, contentDiv);
      return div;
    });
    templateBody.getElementById("content").replaceChildren(...pages);

    const serializer = new XMLSerializer();
    const head = serializer.serializeToString(templateHead);
    const body = serializer.serializeToString(templateBody);
    var html = "<!doctypec html>\n<html>\n<head>"+head+"</head><body>"+body+"</body></html>"
    
    var exportElement = document.createElement('a');
    exportElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
    exportElement.setAttribute('download', projectData["title"] + ".html");
    exportElement.style.display = 'none';
    document.body.appendChild(exportElement);
    exportElement.click();
    document.body.removeChild(exportElement);

  }
)

addPageBtn.addEventListener(
  "click",
  () => {
    showEditTitleModal("Jauns lapas nosaukums", "Mana lapa", "Izveidot lapu", (title) => {
      const newpage = {
        "title": title,
        "content": "",
      }
      const newid = projectData["pages"].push(newpage) - 1;
      updateEditor();
      updatePage(newid);
    })
  }
)
editProjTitleBtn.addEventListener(
  "click",
  () => {
    showEditTitleModal("Projekta nosaukums", projectData["title"], "Saglabāt", (title) => {
      projectData["title"] = title;
      projTitle.textContent = title;
      document.title = title;
    })
  }
)
editPageTitleBtn.addEventListener(
  "click",
  () => {
    showEditTitleModal("Lapas nosaukums", projectData["pages"][currentPage]["title"], "Saglabāt", (title) => {
      projectData["pages"][currentPage]["title"] = title;
      pageTitle.textContent = title;
      pagelist.childNodes[currentPage].firstChild.textContent = title;
    })
  }
)

const updateEditor = () => {
  var pagelinks = projectData["pages"].map((page, index) => {
    var li = document.createElement('li')
    var a = document.createElement('a')
    a.href = "#";
    a.textContent = page["title"];
    a.classList.add("nav-link", "text-white");
    a.dataset.pageId = index;
    a.addEventListener(
      "click",
      (e) => {
        updatePage(e.target.dataset.pageId);
      }
    );
    li.appendChild(a);
    return li;
  });
  pagelist.replaceChildren(...pagelinks);
  projTitle.textContent = projectData["title"];
  document.title = projectData["title"];

  if (currentPage === null) {
    updatePage(0);
  }
}

const savePage = () => {
  if (currentPage !== null) {
    projectData["pages"][currentPage]["content"] = quill.getContents();
  }
}
const updatePage = (pageId) => {
  savePage();

  var page = projectData["pages"][pageId];
  pageTitle.textContent = page["title"];
  content = page["content"]
  if (typeof content === 'string' || content instanceof String) {
    quill.setText(content);
  } else {
    quill.setContents(content);
  }
  pagelist.childNodes.forEach((li, index) => {
    var a = li.firstChild;
    if (index == pageId) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  })
  currentPage = pageId;
}

const showEditTitleModal = (titleText, content, confirmText, cb) => {
  const editTitleModal = new bootstrap.Modal('#editTitleModal')
  const title = document.getElementById('editTitleModalTitle')
  const input = document.getElementById('editTitleInput');
  const btn = document.getElementById('editTitleConfirmBtn');

  title.textContent = titleText;
  input.value = content;
  btn.textContent = confirmText;

  const mycb = () => {
    btn.removeEventListener("click", mycb);
    editTitleModal.dispose();
    cb(input.value);
  }
  btn.addEventListener("click", mycb);

  editTitleModal.show();
};


const quill = new Quill('#editor', {
  theme: 'snow'
});
const hiddenQuill = new Quill('#hiddenEditor', {
  theme: 'snow'
});

updateEditor();
