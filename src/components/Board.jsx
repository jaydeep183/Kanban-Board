import React from 'react';
import { BsThreeDots, BsCircleFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiAlertCircle, FiCircle, FiMoreHorizontal } from 'react-icons/fi';

const Board = ({ tickets, users, grouping, sorting }) => {
  const mapPriorityToLabel = (priority) => {
    const priorityMapping = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority',
    };
    return priorityMapping[priority];
  };

  const organizeTickets = () => {
    let ticketGroups = {};

    if (grouping === 'status') {
      ticketGroups = tickets.reduce((acc, ticket) => {
        const statusKey = ticket.status;
        if (!acc[statusKey]) acc[statusKey] = [];
        acc[statusKey].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      ticketGroups = tickets.reduce((acc, ticket) => {
        const assignedUser = users.find((u) => u.id === ticket.userId);
        const userName = assignedUser ? assignedUser.name : 'Unassigned';
        if (!acc[userName]) acc[userName] = [];
        acc[userName].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      ticketGroups = tickets.reduce((acc, ticket) => {
        const priorityKey = mapPriorityToLabel(ticket.priority);
        if (!acc[priorityKey]) acc[priorityKey] = [];
        acc[priorityKey].push(ticket);
        return acc;
      }, {});
    }

    Object.keys(ticketGroups).forEach((key) => {
      ticketGroups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return ticketGroups;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return <FiAlertCircle className="w-4 h-4 text-red-500" />;
      case 3:
        return <FiAlertCircle className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <FiCircle className="w-4 h-4 text-blue-500" />;
      case 1:
        return <FiCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <FiMoreHorizontal className="w-4 h-4 text-gray-400" />;
    }
  };

  const organizedTickets = organizeTickets();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Object.entries(organizedTickets).map(([groupKey, groupedTickets]) => (
        <div key={groupKey} className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-700">{groupKey}</h2>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {groupedTickets.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <AiOutlinePlus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <BsThreeDots className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {groupedTickets.map((ticket) => {
              const user = users.find((u) => u.id === ticket.userId);
              return (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-500 text-sm">{ticket.id}</span>
                    {user && (
                      <div className="relative">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <span
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            user.available ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        ></span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    {ticket.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(ticket.priority)}
                    {ticket.tag.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        <BsCircleFill className="w-2 h-2 mr-1 text-gray-500" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
