import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const events = [
    { date: 5, type: 'order', label: 'Inicio de Pedidos' },
    { date: 12, type: 'delivery', label: 'Fecha de Entrega' },
    { date: 18, type: 'campaign', label: 'Campaña Especial' },
    { date: 25, type: 'order', label: 'Inicio de Pedidos' }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getEventForDay = (day: number) => {
    return events.find(event => event.date === day);
  };

  return (
    <div className="min-h-screen bg-yellow-50/30">
      <Navbar />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Calendario de Campaña de Polvorones 📅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Consulta las fechas importantes de nuestras campañas de polvorones y no te pierdas ninguna oportunidad de apoyar al grupo
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={previousMonth}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-yellow-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-left-s-line text-2xl text-gray-700"></i>
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h2>
                  <button 
                    onClick={nextMonth}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-yellow-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-2xl text-gray-700"></i>
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {/* Days of month */}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const event = getEventForDay(day);
                    const isToday = day === new Date().getDate() && 
                                    currentMonth.getMonth() === new Date().getMonth() &&
                                    currentMonth.getFullYear() === new Date().getFullYear();

                    return (
                      <div 
                        key={day}
                        className={`aspect-square rounded-xl p-2 transition-all cursor-pointer ${
                          event 
                            ? event.type === 'order' 
                              ? 'bg-green-100 border-2 border-green-500 hover:bg-green-200' 
                              : event.type === 'delivery'
                              ? 'bg-yellow-100 border-2 border-yellow-500 hover:bg-yellow-200'
                              : 'bg-orange-100 border-2 border-orange-500 hover:bg-orange-200'
                            : isToday
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <span className={`text-sm font-semibold ${event ? 'text-gray-900' : 'text-gray-600'}`}>
                            {day}
                          </span>
                          {event && (
                            <div className="mt-1 flex-1 flex items-center justify-center">
                              <i className={`${
                                event.type === 'order' ? 'ri-shopping-cart-line' :
                                event.type === 'delivery' ? 'ri-truck-line' :
                                'ri-megaphone-line'
                              } text-lg`}></i>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Download Button */}
                <div className="mt-8 text-center">
                  <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-download-line text-xl"></i>
                    Descargar Calendario PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Legend and Upcoming Events */}
            <div className="space-y-6">
              {/* Legend */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Leyenda
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 border-2 border-green-500 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-cart-line text-green-700"></i>
                    </div>
                    <span className="text-sm text-gray-700">Inicio de Pedidos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
                      <i className="ri-truck-line text-yellow-700"></i>
                    </div>
                    <span className="text-sm text-gray-700">Fecha de Entrega</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 border-2 border-orange-500 rounded-lg flex items-center justify-center">
                      <i className="ri-megaphone-line text-orange-700"></i>
                    </div>
                    <span className="text-sm text-gray-700">Campaña Especial</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Próximos Eventos
                </h3>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.type === 'order' ? 'bg-green-100' :
                          event.type === 'delivery' ? 'bg-yellow-100' :
                          'bg-orange-100'
                        }`}>
                          <i className={`${
                            event.type === 'order' ? 'ri-shopping-cart-line text-green-700' :
                            event.type === 'delivery' ? 'ri-truck-line text-yellow-700' :
                            'ri-megaphone-line text-orange-700'
                          } text-xl`}></i>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{event.label}</p>
                          <p className="text-sm text-gray-600">
                            {event.date} de {monthNames[currentMonth.getMonth()]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CalendarPage;