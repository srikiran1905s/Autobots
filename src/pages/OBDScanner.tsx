import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Zap, Settings, Gauge, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import Header from "@/components/Header";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OBDScanner = () => {
  const [obdCode, setObdCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const handleDiagnose = async () => {
    if (obdCode.trim()) {
      setIsScanning(true);
      try {
        const response = await fetch(`http://localhost:5000/api/obd/${obdCode.trim()}`);
        const data = await response.json();

        if (data.success) {
          const diagnosis = {
            code: data.data.code,
            meaning: data.data.meaning,
            make: data.data.make,
            severity: getCodeSeverity(data.data.code),
            possibleCauses: data.data.possible_causes,
            troubleshootingSteps: data.data.troubleshooting_steps,
            wiringDiagram: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
          };
          setDiagnosisResult(diagnosis);
        } else {
          // Code not found in database, show fallback
          setDiagnosisResult({
            code: obdCode.toUpperCase(),
            meaning: getCodeMeaning(obdCode.toUpperCase()),
            severity: getCodeSeverity(obdCode.toUpperCase()),
            make: "Generic",
            possibleCauses: [
              "Code not found in database",
              "Please check the code and try again"
            ],
            troubleshootingSteps: [
              "Verify the code is correct",
              "Search online for more information",
              "Consult your vehicle's service manual"
            ],
            wiringDiagram: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
          });
        }
      } catch (error) {
        console.error('Error fetching OBD code:', error);
        // Show error diagnosis
        setDiagnosisResult({
          code: obdCode.toUpperCase(),
          meaning: "Error fetching code information",
          severity: "moderate",
          make: "Generic",
          possibleCauses: [
            "Unable to connect to server",
            "Please check your connection and try again"
          ],
          troubleshootingSteps: [
            "Ensure the backend server is running",
            "Check your internet connection",
            "Try again in a moment"
          ],
          wiringDiagram: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
        });
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleRealTimeScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosisResult(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Fetch a random code from database after scan completes
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/obd/P0171');
        const data = await response.json();

        if (data.success) {
          setDiagnosisResult({
            code: data.data.code,
            meaning: data.data.meaning,
            make: data.data.make,
            severity: getCodeSeverity(data.data.code),
            possibleCauses: data.data.possible_causes,
            troubleshootingSteps: data.data.troubleshooting_steps,
            wiringDiagram: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
          });
        }
      } catch (error) {
        console.error('Error during real-time scan:', error);
      } finally {
        setIsScanning(false);
      }
    }, 3000);
  };

  const handleClearCodes = () => {
    setDiagnosisResult(null);
    setObdCode("");
    setScanProgress(0);
  };

  const getCodeMeaning = (code: string): string => {
    const codeMeanings: { [key: string]: string } = {
      "P0171": "System Too Lean (Bank 1)",
      "P0172": "System Too Rich (Bank 1)",
      "P0300": "Random/Multiple Cylinder Misfire Detected",
      "P0420": "Catalyst System Efficiency Below Threshold (Bank 1)",
      "P0442": "Evaporative Emission System Leak Detected (Small Leak)"
    };
    return codeMeanings[code] || "Unknown Diagnostic Trouble Code";
  };

  const getCodeSeverity = (code: string): string => {
    if (code.startsWith("P03")) return "high";
    if (code.startsWith("P04")) return "moderate";
    return "moderate";
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="w-6 h-6 text-destructive" />;
      case "moderate":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-rajdhani font-bold text-foreground mb-4">
              OBD <span className="text-primary animate-glow-pulse">Diagnostic Scanner</span>
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
              Advanced on-board diagnostics for real-time vehicle analysis and troubleshooting
            </p>
          </motion.div>

          {/* Real-Time Scan Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-gradient-to-br from-card to-primary/5 rounded-2xl p-8 border-2 border-primary/30 shadow-lg"
          >
            <h2 className="text-3xl font-rajdhani font-bold text-foreground mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              Real-Time Vehicle Scan
            </h2>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleRealTimeScan}
                  disabled={isScanning}
                  className="flex-1 bg-primary hover:bg-primary/90 font-rajdhani font-semibold h-14 text-lg disabled:opacity-50"
                >
                  {isScanning ? "Scanning..." : "Start Real-Time Scan"}
                </Button>
                <Button 
                  onClick={handleClearCodes}
                  variant="outline"
                  className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10 font-rajdhani font-semibold h-14 text-lg"
                >
                  Clear Codes
                </Button>
              </div>

              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm font-rajdhani text-muted-foreground">
                    <span>Scanning vehicle systems...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Manual Code Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-card rounded-2xl p-8 border border-border"
          >
            <h2 className="text-3xl font-rajdhani font-bold text-foreground mb-6 flex items-center gap-3">
              <Search className="w-8 h-8 text-primary" />
              Manual Code Lookup
            </h2>
            
            <p className="text-muted-foreground mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Enter a diagnostic trouble code (DTC) to get detailed information and troubleshooting steps
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                value={obdCode}
                onChange={(e) => setObdCode(e.target.value.toUpperCase())}
                placeholder=""
                className="flex-1 bg-muted border-primary/20 font-roboto-mono text-lg h-14 px-6"
                onKeyPress={(e) => e.key === "Enter" && handleDiagnose()}
              />
              <Button 
                onClick={handleDiagnose}
                disabled={!obdCode.trim()}
                className="bg-primary hover:bg-primary/90 font-rajdhani font-semibold h-14 px-10 text-lg disabled:opacity-50"
              >
                Diagnose Code
              </Button>
            </div>
          </motion.div>

          {/* Diagnosis Results */}
          {diagnosisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-card to-primary/5 rounded-2xl p-8 border-2 border-primary/30 shadow-[0_0_30px_rgba(251,146,60,0.2)]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    {getSeverityIcon(diagnosisResult.severity)}
                    <h2 className="text-4xl font-rajdhani font-bold text-foreground">
                      Diagnostic Results
                    </h2>
                  </div>
                  <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border inline-block">
                    <p className="text-2xl font-roboto-mono text-primary font-bold mb-2">
                      Code: {diagnosisResult.code}
                    </p>
                    <p className="text-lg text-foreground">
                      {diagnosisResult.meaning}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDiagnosisResult(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-background/50 backdrop-blur rounded-xl p-6 border border-border">
                  <h3 className="text-2xl font-rajdhani font-bold text-foreground mb-4 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-primary" />
                    Possible Causes
                  </h3>
                  <ul className="space-y-3">
                    {diagnosisResult.possibleCauses.map((cause: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground">
                        <span className="text-primary text-xl mt-0.5">•</span>
                        <span className="text-base leading-relaxed">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-background/50 backdrop-blur rounded-xl p-6 border border-border">
                  <h3 className="text-2xl font-rajdhani font-bold text-foreground mb-4 flex items-center gap-2">
                    <Gauge className="w-6 h-6 text-primary" />
                    Troubleshooting Steps
                  </h3>
                  <ol className="space-y-3">
                    {diagnosisResult.troubleshootingSteps.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground">
                        <span className="text-primary font-bold font-roboto-mono text-base">{idx + 1}.</span>
                        <span className="text-base leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-background/50 backdrop-blur rounded-xl p-6 border border-border">
                <h3 className="text-2xl font-rajdhani font-bold text-foreground mb-4">
                  Wiring Diagram Reference
                </h3>
                <img 
                  src={diagnosisResult.wiringDiagram} 
                  alt="Wiring diagram"
                  className="w-full rounded-lg border border-border shadow-lg"
                />
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default OBDScanner;
