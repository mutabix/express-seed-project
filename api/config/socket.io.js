const io = require('socket.io')();
const config = require('./index');

io.sockets.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
  });
  socket.on('createdData', (data) => {
    io.emit('createdData', data);
  });
  socket.on('updatedData', (data) => {
    io.emit('updatedData', data);
  });
  socket.on('deletedData', (data) => {
    io.emit('deletedData', data);
  });
  socket.on('notification', (data) => {
    socket.to(data.receiverId).emit('notification', data);
  });
  socket.on('leave', (room) => {
    socket.leave(room);
  });
});

io.origins([
  process.env.NODE_ENV === 'production'
    ? `${config.FRONTEND_URI}:443`
    : config.FRONTEND_URI,
]);

module.exports = io;
