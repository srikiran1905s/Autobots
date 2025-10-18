import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Edit, Trash2,
  Shield, Key, Bell, Globe, Eye, LogOut, HelpCircle, 
  MessageSquare, ThumbsUp, Bookmark, Settings, Camera,
  ChevronRight, CheckCircle2, XCircle, Clock, Lock
} from "lucide-react";
import Header from "@/components/Header";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  // User State
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    garage: "Downtown Auto Repair",
    membershipStatus: "Mechanic",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  });

  // Editing States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Preferences State
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: true,
    commentPrivacy: false,
    language: "en",
    twoFactorAuth: false
  });

  // Mock Data
  const diagnosticHistory = [
    { id: 1, code: "P0171", date: "2025-01-15 10:30 AM", resolved: true, vehicle: "Toyota Camry" },
    { id: 2, code: "P0300", date: "2025-01-10 02:15 PM", resolved: false, vehicle: "Honda Civic" },
    { id: 3, code: "P0420", date: "2025-01-05 09:45 AM", resolved: true, vehicle: "Toyota Camry" }
  ];

  const communityStats = {
    posts: 24,
    comments: 156,
    reputation: 892,
    helpfulVotes: 234
  };

  const savedGuides = [
    { id: 1, title: "How to Fix P0171 Code", vehicle: "Toyota Camry", date: "2025-01-12" },
    { id: 2, title: "Catalytic Converter Replacement Guide", vehicle: "All Vehicles", date: "2025-01-08" }
  ];

  // Handlers
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      });
      navigate('/');
    }
  };

  const togglePreference = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-8 mb-6 border-2 border-primary/20 shadow-[0_0_30px_rgba(251,146,60,0.1)]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt="User Avatar" 
                  className="w-32 h-32 rounded-full border-4 border-primary/30"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-rajdhani font-bold text-foreground mb-2">
                  {user.name}
                </h1>
                <div className="space-y-1 mb-4">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  {user.phone && (
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </p>
                  )}
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Shield className="w-3 h-3 mr-1" />
                  {user.membershipStatus}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  variant="outline"
                  className="font-rajdhani font-semibold border-primary/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="font-rajdhani font-semibold border-primary/30"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>

            {/* Edit Profile Form */}
            {isEditingProfile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6 pt-6 border-t border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="garage">Garage/Workshop</Label>
                    <Input
                      id="garage"
                      value={editedUser.garage}
                      onChange={(e) => setEditedUser({...editedUser, garage: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={handleSaveProfile} className="bg-primary">
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditingProfile(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* OBD Diagnostic History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  OBD Diagnostic History
                </h2>

                <div className="space-y-3">
                  {diagnosticHistory.map((diagnostic) => (
                    <div
                      key={diagnostic.id}
                      className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-roboto-mono font-bold text-lg text-primary">
                              {diagnostic.code}
                            </span>
                            {diagnostic.resolved ? (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Resolved
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {diagnostic.vehicle} • {diagnostic.date}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Community Contributions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Community Contributions
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background rounded-lg p-4 text-center border border-border">
                    <div className="text-3xl font-rajdhani font-bold text-primary mb-1">
                      {communityStats.posts}
                    </div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center border border-border">
                    <div className="text-3xl font-rajdhani font-bold text-primary mb-1">
                      {communityStats.comments}
                    </div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center border border-border">
                    <div className="text-3xl font-rajdhani font-bold text-primary mb-1">
                      {communityStats.reputation}
                    </div>
                    <div className="text-sm text-muted-foreground">Reputation</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center border border-border">
                    <div className="text-3xl font-rajdhani font-bold text-primary mb-1">
                      {communityStats.helpfulVotes}
                    </div>
                    <div className="text-sm text-muted-foreground">Helpful Votes</div>
                  </div>
                </div>
              </motion.div>

              {/* Saved Repairs & Guides */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <Bookmark className="w-6 h-6 text-primary" />
                  Saved Repairs & Guides
                </h2>

                <div className="space-y-3">
                  {savedGuides.map((guide) => (
                    <div
                      key={guide.id}
                      className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <h3 className="font-rajdhani font-bold text-foreground mb-2">
                        {guide.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{guide.vehicle}</span>
                        <span>Saved on {guide.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Settings & Preferences */}
            <div className="space-y-6">
              
              {/* Preferences */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  Preferences
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-rajdhani font-semibold">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-rajdhani font-semibold">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates</p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={() => togglePreference('emailNotifications')}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-rajdhani font-semibold">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications}
                      onCheckedChange={() => togglePreference('pushNotifications')}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-rajdhani font-semibold">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Public profile</p>
                    </div>
                    <Switch
                      checked={preferences.profileVisibility}
                      onCheckedChange={() => togglePreference('profileVisibility')}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-rajdhani font-semibold">Comment Privacy</Label>
                      <p className="text-sm text-muted-foreground">Hide comments</p>
                    </div>
                    <Switch
                      checked={preferences.commentPrivacy}
                      onCheckedChange={() => togglePreference('commentPrivacy')}
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="language" className="font-rajdhani font-semibold">Language</Label>
                    <select
                      id="language"
                      value={preferences.language}
                      onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                      className="w-full mt-2 bg-background border border-border rounded-lg p-2 text-foreground"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Account Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  Security
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div>
                      <Label className="font-rajdhani font-semibold">Two-Factor Auth</Label>
                      <p className="text-sm text-muted-foreground">Extra security layer</p>
                    </div>
                    <Switch
                      checked={preferences.twoFactorAuth}
                      onCheckedChange={() => togglePreference('twoFactorAuth')}
                    />
                  </div>

                  <Button variant="outline" className="w-full justify-start font-rajdhani font-semibold">
                    <Key className="w-4 h-4 mr-2" />
                    Manage API Keys
                  </Button>

                  <Separator />

                  <Button 
                    variant="outline" 
                    className="w-full justify-start font-rajdhani font-semibold"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start font-rajdhani font-semibold text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-foreground flex items-center gap-2 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Support
                </h2>

                <div className="space-y-3">
                  <Link to="/help">
                    <Button variant="outline" className="w-full justify-start font-rajdhani font-semibold">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & FAQ
                    </Button>
                  </Link>

                  <Button variant="outline" className="w-full justify-start font-rajdhani font-semibold">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>

                  <Button variant="outline" className="w-full justify-start font-rajdhani font-semibold">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default Profile;
