import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from '@fullcalendar/core/locales/es';

const { ipcRenderer } = window.require("electron");

//const events = [{ title: "Meeting", start: new Date() }];
const headerToolbar = {
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
};
const initialDate = new Date();



export function Calendar() {

  const [events, setEvents] = React.useState({});

  const getEvents = () => {
    ipcRenderer.send("get_events:submit");
    ipcRenderer.on("get_events:result", (event, result) => {
      setEvents(result);
    });
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex flex-col justify-center mt-12">
      <div className="rounded rounded-lg bg-slate-200 dark:bg-white/10 mb-7">
        <div className="flex px-4 py-4 border-b border-gray-400 dark:border-gray-200">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="text-blue-400">Agenda</h2>
            </div>
          </div>
        </div>
        <div className="container sub-container-narrow p-8 m-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            events={events}
            eventContent={renderEventContent}
            headerToolbar={headerToolbar}
            initialDate={initialDate}
            locale={esLocale}
            buttonIcons={false}
            navLinks={true}
            editable={true}
            selectable={true}
            dayMaxEvents={true}
          />
        </div>
      </div>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
