import React, { useState } from 'react';
import { marked } from 'marked';
import { Container, TextField, Button, Typography, Grid, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function App() {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([]); // Changed to array to store conversation
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('codellama-13b');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    })
    .then(response => response.json())
    .then(data => {
      setConversation([...conversation, { prompt, response: marked(data.result) }]); // Append new interaction
      setPrompt(''); // Clear prompt input after submission
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" style={{ paddingBottom: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Llama Chat Model
      </Typography>
      {/* Display the conversation */}
      <Box my={4}>
        {conversation.map((interaction, index) => (
          <div key={index}>
            <Typography color="textSecondary">You: {interaction.prompt}</Typography>
            <Box dangerouslySetInnerHTML={{ __html: interaction.response }} />
          </div>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={model}
                label="Model"
                onChange={(e) => setModel(e.target.value)}
              >
                <MenuItem value="codellama-13b">codellama-13b</MenuItem>
                <MenuItem value="Model2">Model 2</MenuItem>
                <MenuItem value="Model3">Model 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="Enter your prompt"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Generate
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
