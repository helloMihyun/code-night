(function() {
  if(localStorage.getItem("kanban_details") == null) {
    localStorage.setItem("kanban_details",JSON.stringify([{
        description: 'Get filing flow',
        date: '02/10/19',
        assignee: 'James',
        status: 'planned'
      },
      {
        description: 'ITR filing flow',
        date: '02/20/19',
        assignee: 'Jenny',
        status: 'planned'
      },
      {
        description: 'Metrics dashboard',
        date: '02/16/19',
        assignee: 'Jane',
        status: 'started'
      },
      {
        description: 'Error dashboard',
        date: '02/20/19',
        assignee: 'James',
        status: 'planned'
      },
      {
        description: 'Advance returns flow',
        date: '02/14/19',
        assignee: 'Jenny',
        status: 'done'
      },
      {
        description: 'Advance returns flow',
        date: '02/20/19',
        assignee: 'Jane',
        status: 'done'
      }
    ]))
  }
  var kanban_details = JSON.parse(localStorage.getItem("kanban_details"));
  var plannedHTML = startedHTML = doneHTML = '';
  for(var i=0; i< kanban_details.length; i++) {
    if(kanban_details[i].status == 'planned') {
      plannedHTML = plannedHTML + `
        <article class="kanban-entry" draggable="true">
          <div class="kanban-entry-center">
            <h5 id="${i+'_description_label'}" ondblclick="handledblclick(${i}, 'description');">${kanban_details[i].description}</h5>
            <input style="display:none;" class="editDescription" type="text" id="${i+'_description_input'}" onblur="saveValue(${i}, 'description');" value="${kanban_details[i].description}" />
            <div class="kanban-details">
              <b>Due:</b><span id=${i+"_date_label"} ondblclick="handledblclick(${i}, 'date');"> ${kanban_details[i].date}</span>
              <input style="display:none;" class="editDate" type="text" id=${i+"_date_input"} onblur="saveValue(${i}, 'date');" value="${kanban_details[i].date}">
              <span id=${i+'_assignee_label'} ondblclick="handledblclick(${i}, 'assignee');" class="assignedTo">${kanban_details[i].assignee}</span>
              <select style="display:none;" class="editAssignee" id=${i+'_assignee_input'} onblur="saveValue(${i}, 'assignee');" value="${kanban_details[i].assignee}">
                <option value="jane">Jane</option>
                <option value="james">James</option>
                <option value="jenny">Jenny</option>
              </select>
            </div>
          </div>
        </article>
      `;
    } else if(kanban_details[i].status == 'started') {
      startedHTML = startedHTML + `
      <article class="kanban-entry" draggable="true">
        <div class="kanban-entry-center">
          <h5 id="${i+'_description_label'}" ondblclick="handledblclick(${i}, 'description');">${kanban_details[i].description}</h5>
          <input style="display:none;" class="editDescription" type="text" id="${i+'_description_input'}" onblur="saveValue(${i}, 'description');" value="${kanban_details[i].description}" />
          <div class="kanban-details">
            <b>Due:</b><span id=${i+"_date_label"} ondblclick="handledblclick(${i}, 'date');"> ${kanban_details[i].date}</span>
            <input style="display:none;" class="editDate" type="text" id=${i+"_date_input"} onblur="saveValue(${i}, 'date');" value="${kanban_details[i].date}">
            <span id=${i+'_assignee_label'} ondblclick="handledblclick(${i}, 'assignee');" class="assignedTo">${kanban_details[i].assignee}</span>
            <select style="display:none;" class="editAssignee" id=${i+'_assignee_input'} onblur="saveValue(${i}, 'assignee');" value="${kanban_details[i].assignee}">
              <option value="jane">Jane</option>
              <option value="james">James</option>
              <option value="jenny">Jenny</option>
            </select>
          </div>
        </div>
      </article>
      `;
    } else {
      doneHTML = doneHTML + `
        <article class="kanban-entry ${(new Date(kanban_details[i].date) < new Date())?'red':'green'}" draggable="true">
          <div class="kanban-entry-center">
            <h5 id="${i+'_description_label'}" ondblclick="handledblclick(${i}, 'description');">${kanban_details[i].description}</h5>
            <input style="display:none;" class="editDescription" type="text" id="${i+'_description_input'}" onblur="saveValue(${i}, 'description');" value="${kanban_details[i].description}" />
            <div class="kanban-details">
              <b>Due:</b><span id=${i+"_date_label"} ondblclick="handledblclick(${i}, 'date');"> ${kanban_details[i].date}</span>
              <input style="display:none;" class="editDate" type="text" id=${i+"_date_input"} onblur="saveValue(${i}, 'date');" value="${kanban_details[i].date}">
              <span id=${i+'_assignee_label'} ondblclick="handledblclick(${i}, 'assignee');" class="assignedTo">${kanban_details[i].assignee}</span>
              <select style="display:none;" class="editAssignee" id=${i+'_assignee_input'} onblur="saveValue(${i}, 'assignee');" value="${kanban_details[i].assignee}">
                <option value="jane">Jane</option>
                <option value="james">James</option>
                <option value="jenny">Jenny</option>
              </select>
            </div>
          </div>
        </article>
      `;
    }

    document.getElementById('planned').innerHTML = plannedHTML;
    document.getElementById('started').innerHTML = startedHTML;
    document.getElementById('done').innerHTML = doneHTML;
  }
})();

function newTask(val) {
  document.getElementById('newStatus').value = val;
}

function createNewTask() {
  var json = {
    description: document.getElementById('newDesc').value,
    date: document.getElementById('newDate').value,
    assignee: document.getElementById('newAssignee').value,
    status: document.getElementById('newStatus').value
  }
  var updated_details = JSON.parse(localStorage.getItem('kanban_details'));
  updated_details.push(json);
  var i = updated_details.length - 1;
  localStorage.setItem('kanban_details',JSON.stringify(updated_details));
  var html = `
    <article class="kanban-entry ${(json.status == 'done')?((new Date(json.date) < new Date())?'red':'green'):''}" draggable="true">
      <div class="kanban-entry-center">
        <h5 id="${i+'_description_label'}" ondblclick="handledblclick(${i}, 'description');">${json.description}</h5>
        <input style="display:none;" class="editDescription" type="text" id="${i+'_description_input'}" onblur="saveValue(${i}, 'description');" value="${json.description}" />
        <div class="kanban-details">
          <b>Due:</b><span id=${i+"_date_label"} ondblclick="handledblclick(${i}, 'date');"> ${json.date}</span>
          <input style="display:none;" class="editDate" type="text" id=${i+"_date_input"} onblur="saveValue(${i}, 'date');" value="${json.date}">
          <span id=${i+'_assignee_label'} ondblclick="handledblclick(${i}, 'assignee');" class="assignedTo">${json.assignee}</span>
          <select style="display:none;" class="editAssignee" id=${i+'_assignee_input'} onblur="saveValue(${i}, 'assignee');" value="${kanban_details[i].assignee}">
            <option value="jane">Jane</option>
            <option value="james">James</option>
            <option value="jenny">Jenny</option>
          </select>
        </div>
      </div>
    </article>
    `;
    document.getElementById(json.status).insertAdjacentHTML('beforeend',html);
    resetModal();
}

function resetModal() {
  document.getElementById('newDesc').value = '';
  document.getElementById('newDate').value = '';
  document.getElementById('newAssignee').value = '';
  document.getElementById('newStatus').value = '';
}

function handledblclick(index, field) {
  console.log(index+"_"+field+"_label");
  document.getElementById(index+"_"+field+"_label").style.display = 'none';
  document.getElementById(index+"_"+field+"_input").style.display = 'inline';
  document.getElementById(index+"_"+field+"_input").focus();
}

function saveValue(index, field) {
  document.getElementById(index+"_"+field+"_label").innerHTML = document.getElementById(index+"_"+field+"_input").value;
  kanban_details = JSON.parse(localStorage.getItem('kanban_details'));
  kanban_details[index][field] = document.getElementById(index+"_"+field+"_input").value;
  localStorage.setItem('kanban_details', JSON.stringify(kanban_details));
  document.getElementById(index+"_"+field+"_label").style.display = 'inline';
  document.getElementById(index+"_"+field+"_input").style.display = 'none';
}