import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Divider,
} from '@mui/material'
import {
  ArrowForward as ActivationIcon,
  Block as InhibitionIcon,
} from '@mui/icons-material'

const ConnectionDialog = ({ open, onClose, sourceComponent, targetComponent, onConfirm }) => {
  const [connectionType, setConnectionType] = useState('activation')

  const handleConfirm = () => {
    onConfirm(connectionType)
    onClose()
  }

  if (!sourceComponent || !targetComponent) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
        🔗 Create Connection
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Connect:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              backgroundColor: '#F5F5F5',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: sourceComponent.color + '30',
                border: `2px solid ${sourceComponent.color}`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {sourceComponent.name}
              </Typography>
            </Box>

            <Typography variant="h4">→</Typography>

            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: targetComponent.color + '30',
                border: `2px solid ${targetComponent.color}`,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {targetComponent.name}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" fontWeight={600} gutterBottom>
          How does {sourceComponent.name} affect {targetComponent.name}?
        </Typography>

        <RadioGroup
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value)}
        >
          <FormControlLabel
            value="activation"
            control={<Radio size="large" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ActivationIcon sx={{ color: '#4CAF50', fontSize: 28 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Activation (Turns ON)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    When {sourceComponent.name} is ON, it turns {targetComponent.name} ON
                  </Typography>
                </Box>
              </Box>
            }
            sx={{
              border: connectionType === 'activation' ? '2px solid #4CAF50' : '2px solid transparent',
              borderRadius: 2,
              p: 2,
              mb: 2,
              backgroundColor: connectionType === 'activation' ? '#E8F5E9' : 'transparent',
            }}
          />

          <FormControlLabel
            value="inhibition"
            control={<Radio size="large" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InhibitionIcon sx={{ color: '#F44336', fontSize: 28 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Inhibition (Turns OFF)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    When {sourceComponent.name} is ON, it turns {targetComponent.name} OFF
                  </Typography>
                </Box>
              </Box>
            }
            sx={{
              border: connectionType === 'inhibition' ? '2px solid #F44336' : '2px solid transparent',
              borderRadius: 2,
              p: 2,
              backgroundColor: connectionType === 'inhibition' ? '#FFEBEE' : 'transparent',
            }}
          />
        </RadioGroup>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          size="large"
          variant="outlined"
          sx={{ minHeight: 44, minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          size="large"
          variant="contained"
          sx={{ minHeight: 44, minWidth: 100 }}
        >
          Create Connection
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConnectionDialog
