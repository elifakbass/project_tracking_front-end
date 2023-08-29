import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { usePersonel } from '../../context/PersonelContext';
import { getYorumlarByProjeId } from '../../api';

export default function AlignItemsList(props) {
  const { projeId } = props;
  const [yorum, setYorum] = React.useState([]);
  const [showPrevious, setShowPrevious] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  const { personeller, guncel } = usePersonel();

  React.useEffect(() => {
    const getYorumlar = () => {
      getYorumlarByProjeId(projeId).then((res) => {
        setYorum(res);
      });
    };
    getYorumlar();
  }, [guncel]);
console.log(projeId);
  React.useEffect(() => {
    const getYorumlar = () => {
      getYorumlarByProjeId(projeId).then((res) => {
        setYorum(res);
      });
    };
    getYorumlar();
  }, []);

  const visibleYorumlar = showPrevious
    ? yorum.slice(Math.max(startIndex - 3, 0), startIndex)
    : yorum.slice(Math.max(yorum.length - 3, 0));

  const toggleShowPrevious = () => {
    setShowPrevious((prev) => !prev);
    if (!showPrevious) {
      setStartIndex(Math.max(yorum.length - 3, 0));
    }
  };

  return (
    <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
      {visibleYorumlar.map((yorum, index) => (
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <img src={personeller[yorum.personel_id - 1].image} width={40} />
          </ListItemAvatar>
          <ListItemText
            primary={personeller[yorum.personel_id - 1].name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {yorum.icerik}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      {!showPrevious && yorum.length > 3 && (
        <ListItem alignItems="center" sx={{ justifyContent: 'center' }}>
          <Typography
            color="primary"
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={toggleShowPrevious}
          >
            Daha önceki yorumları göster
          </Typography>
        </ListItem>
      )}
    </List>
  );
}