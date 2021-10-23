export const idlFactory = ({ IDL }) => {
  const Event = IDL.Record({
    'id' : IDL.Nat,
    'tz' : IDL.Text,
    'end' : IDL.Nat,
    'status' : IDL.Nat,
    'title' : IDL.Text,
    'owner' : IDL.Text,
    'description' : IDL.Text,
    'calendar' : IDL.Nat,
    'start' : IDL.Nat,
    'ispublic' : IDL.Bool,
    'location' : IDL.Text,
  });
  const Calendar = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'status' : IDL.Nat,
    'owner' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'ispublic' : IDL.Bool,
    'isverified' : IDL.Bool,
  });
  const Comment = IDL.Record({
    'attachid' : IDL.Nat,
    'user' : IDL.Text,
    'comment' : IDL.Text,
    'timestamp' : IDL.Nat,
    'attachtype' : IDL.Nat,
  });
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'status' : IDL.Nat,
    'owner' : IDL.Text,
    'todo' : IDL.Text,
    'description' : IDL.Text,
    'duedate' : IDL.Nat,
    'calendar' : IDL.Nat,
    'ispublic' : IDL.Bool,
    'parent' : IDL.Nat,
  });
  const BBS = IDL.Record({
    'userid' : IDL.Text,
    'post' : IDL.Text,
    'timestamp' : IDL.Nat,
  });
  const Profile = IDL.Record({
    'status' : IDL.Nat,
    'subcals' : IDL.Vec(IDL.Nat),
    'userid' : IDL.Text,
    'name' : IDL.Text,
    'role' : IDL.Nat,
  });
  const Vansday = IDL.Service({
    'addCalendar' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Bool],
        [],
        [],
      ),
    'addComment' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text, IDL.Nat, IDL.Nat],
        [],
        [],
      ),
    'addEvent' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Bool,
        ],
        [],
        [],
      ),
    'addTodo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Bool, IDL.Nat],
        [],
        [],
      ),
    'addUser' : IDL.Func([IDL.Text], [], []),
    'completeTodo' : IDL.Func([IDL.Nat], [], []),
    'editTodo' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Bool, IDL.Nat],
        [],
        [],
      ),
    'getCalEvents' : IDL.Func([IDL.Nat], [IDL.Vec(Event)], ['query']),
    'getCalendars' : IDL.Func([], [IDL.Vec(Calendar)], ['query']),
    'getComments' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Comment)], ['query']),
    'getEvents' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Event)], ['query']),
    'getMyCalendars' : IDL.Func([IDL.Text], [IDL.Vec(Calendar)], ['query']),
    'getMyEvents' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [IDL.Vec(Event)],
        ['query'],
      ),
    'getMyTodos' : IDL.Func([IDL.Text], [IDL.Vec(Todo)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(BBS)], ['query']),
    'getTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
    'idQuick' : IDL.Func([], [IDL.Principal], []),
    'installer' : IDL.Func([], [IDL.Principal], ['query']),
    'listUsers' : IDL.Func([], [IDL.Vec(Profile)], ['query']),
    'lookupUser' : IDL.Func([IDL.Text], [IDL.Opt(Profile)], ['query']),
    'updateCalendar' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Bool,
          IDL.Bool,
          IDL.Nat,
        ],
        [],
        [],
      ),
    'updateEvent' : IDL.Func(
        [
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Bool,
          IDL.Nat,
        ],
        [],
        [],
      ),
    'userCount' : IDL.Func([], [IDL.Nat], ['query']),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
  return Vansday;
};
export const init = ({ IDL }) => { return []; };
