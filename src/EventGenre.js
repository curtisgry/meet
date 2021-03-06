import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {
  const COLORS = ['#D5BBB1', '#44633F', '#E76D83', '#5CAB7D', '#4ADBC8'];

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getEventGenres());
  }, [events]);

  const getEventGenres = () => {
    const genreData = genres.map((genre) => {
      const value = events.filter((event) => {
        const { summary } = event;
        return summary.split(' ').includes(genre);
      }).length;
      return { name: genre, value };
    });
    return genreData;
  };

  return (
    <ResponsiveContainer height={400}>
      <PieChart height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="center" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

EventGenre.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventGenre;
