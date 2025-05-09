import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
  Alert,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@mui/material';
import { logout, getToken } from '../services/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTests, setShowTests] = useState(false);

  useEffect(() => {
    const currentToken = getToken();
    setToken(currentToken);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testScenarios = [
    {
      title: "Test 1: Access Without Token",
      steps: [
        "1. Open browser dev tools (F12)",
        "2. Go to Application tab",
        "3. Clear Local Storage",
        "4. Refresh the page",
        "Expected: Redirected to login page"
      ]
    },
    {
      title: "Test 2: Invalid Token",
      steps: [
        "1. Copy current token",
        "2. Logout",
        "3. Login again",
        "4. Try using old token in API request",
        "Expected: 401 Unauthorized error"
      ]
    },
    {
      title: "Test 3: Token Expiration",
      steps: [
        "1. Login and get token",
        "2. Wait for token expiration (if configured)",
        "3. Try accessing protected route",
        "Expected: 401 Unauthorized error"
      ]
    },
    {
      title: "Test 4: CORS Protection",
      steps: [
        "1. Try accessing API from different origin",
        "2. Without proper CORS headers",
        "Expected: CORS error"
      ]
    }
  ];

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
            Authentication Success!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You have successfully authenticated using Django REST Framework's Token Authentication.
          </Typography>
          <Alert severity="success" sx={{ width: '100%', mb: 3 }}>
            This page is protected and can only be accessed with a valid authentication token.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Technical Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Authentication Token
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    backgroundColor: '#f5f5f5',
                    padding: 1,
                    borderRadius: 1,
                    flex: 1,
                    wordBreak: 'break-all',
                  }}
                >
                  {token}
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy token"}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleCopyToken}
                  >
                    Copy
                  </Button>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How It Works
              </Typography>
              <Typography variant="body2" paragraph>
                1. The login request is sent to Django REST Framework's authentication endpoint
              </Typography>
              <Typography variant="body2" paragraph>
                2. Django validates credentials using its built-in authentication system
              </Typography>
              <Typography variant="body2" paragraph>
                3. Upon success, a token is generated using rest_framework.authtoken
              </Typography>
              <Typography variant="body2" paragraph>
                4. The token is stored in the database and returned to the client
              </Typography>
              <Typography variant="body2" paragraph>
                5. Subsequent requests include this token in the Authorization header
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
                Authorization: Token {token.substring(0, 8)}...
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Security Test Scenarios
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowTests(!showTests)}
                >
                  {showTests ? 'Hide Tests' : 'Show Tests'}
                </Button>
              </Box>
              <Collapse in={showTests}>
                <List>
                  {testScenarios.map((scenario, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={scenario.title}
                        secondary={
                          <List dense>
                            {scenario.steps.map((step, stepIndex) => (
                              <ListItem key={stepIndex}>
                                <ListItemText primary={step} />
                              </ListItem>
                            ))}
                          </List>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 