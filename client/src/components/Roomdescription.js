import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Footer from './Footer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardmain: {
    height: '100%',
    weight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  margin: {
    marginTop: 50,
  },
  price_margin: {
    marginTop: 30,
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {/* <div className={classes.heroContent}>
        {/* <img src='images/image123.png'></img> */}
          {/* <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              HOTEL DELUNA
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                
            </Typography>
          </Container>
        </div> */} 
        <Typography className={classes.margin} component="h1" variant="h2" align="center" color="textPrimary" >
              HOTEL DELUNA ROOMS
            </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

              {/* 첫번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      싱글 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 2명
                    </Typography>
                    <Typography>
                      -싱글배드 : 1개
                    </Typography>
                    <Typography>
                      -면적 : 16 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4" align="right" >
                      75,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='singleroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 두번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      더블 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 4명
                    </Typography>
                    <Typography>
                      -더블배드 : 1개
                    </Typography>
                    <Typography>
                      -면적 : 18 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      120,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='doubleroom'size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 세번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      트윈 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 5명
                    </Typography>
                    <Typography>
                      -싱글배드 : 2개
                    </Typography>
                    <Typography>
                      -면적 : 26 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      150,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='twinroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 네번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      트리플 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 4명
                    </Typography>
                    <Typography>
                      -싱글배드 : 3개
                    </Typography>
                    <Typography>
                      -면적 : 26 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      200,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='tripleroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 다섯번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      디럭스 트윈룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 4명
                    </Typography>
                    <Typography>
                      -더블배드 : 2개
                    </Typography>
                    <Typography>
                      -면적 : 28 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      240,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='deluxroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 여섯번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      온돌 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 6명
                    </Typography>
                    <Typography>
                      -한국식 이불 : 2개
                    </Typography>
                    <Typography>
                      -면적 : 34 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      240,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='ondolroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* 일곱번째 카드 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.cardmain}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="images/img-room2.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      스위트 룸
                    </Typography>
                    <Typography>
                      -제한 인원 : 8명
                    </Typography>
                    <Typography>
                      -더블배드 : 2개
                    </Typography>
                    <Typography>
                      -면적 : 40 제곱미터(m2)
                    </Typography>
                    <Typography className={classes.price_margin} variant="h4"  align="right" >
                      320,000₩
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button href='sweetroom' size="small" color="primary">
                      자세히보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Footer></Footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}