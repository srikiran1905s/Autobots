import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Settings, Gauge, Users, Fuel, Zap, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { manufacturers, models } from "@/data/manufacturers";
import { useState } from "react";

interface Comment {
  id: number;
  user: string;
  time: string;
  text: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

const VehicleDetail = () => {
  const { make, model: modelId } = useParams<{ make: string; model: string }>();
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: "John D.", time: "2 hours ago", text: "Great vehicle! Very reliable for long trips.", likes: 12, dislikes: 1, replies: [] },
    { id: 2, user: "Sarah M.", time: "1 day ago", text: "Had some issues with the transmission, but dealer fixed it quickly.", likes: 8, dislikes: 2, replies: [
      { id: 3, user: "Mike T.", time: "12 hours ago", text: "What kind of transmission issues did you have?", likes: 2, dislikes: 0 }
    ] },
  ]);

  const manufacturer = manufacturers.find(m => m.id === make);
  const allModels = models[make as keyof typeof models] || [];
  const vehicleModel = allModels.find(m => m.id === modelId);

  if (!manufacturer || !vehicleModel) {
    return <div>Vehicle not found</div>;
  }

  const handlePostComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        user: "You",
        time: "Just now",
        text: comment,
        likes: 0,
        dislikes: 0,
        replies: []
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const handlePostReply = (commentId: number) => {
    if (replyText.trim()) {
      const newReply: Comment = {
        id: Date.now(),
        user: "You",
        time: "Just now",
        text: replyText,
        likes: 0,
        dislikes: 0
      };
      
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      }));
      
      setReplyText("");
      setReplyTo(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground font-rajdhani">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/vehicle/${make}`} className="hover:text-primary transition-colors">
              {manufacturer.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{vehicleModel.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-rajdhani font-bold text-foreground mb-2">
              {manufacturer.name} <span className="text-primary">{vehicleModel.name}</span> {vehicleModel.year}
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani">{vehicleModel.trim} • {vehicleModel.bodyType}</p>
          </motion.div>

          {/* SECTION 1: VEHICLE SPECS PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-rajdhani font-bold text-foreground mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-primary" />
              Vehicle Specifications
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
                <img 
                  src={vehicleModel.image} 
                  alt={`${vehicleModel.name} ${vehicleModel.year}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-gradient-to-br from-card to-primary/5 rounded-2xl p-8 border border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Settings className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Engine</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.engine}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Gauge className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Capacity</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.capacity}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Max Power</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.power}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Settings className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Transmission</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.transmission}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Seating</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.seating}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Fuel className="w-4 h-4 text-primary" />
                      <p className="text-sm font-rajdhani">Fuel Type</p>
                    </div>
                    <p className="font-roboto-mono font-bold text-foreground text-lg">{vehicleModel.specs.fuelType}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground font-rajdhani mb-4 font-semibold">Key Features</p>
                  <div className="flex flex-wrap gap-3">
                    {vehicleModel.specs.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-rajdhani font-semibold border border-primary/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COMMUNITY DISCUSSION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border-2 border-border"
          >
            <h2 className="text-3xl font-rajdhani font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Community Discussion
            </h2>
            <p className="text-muted-foreground mb-6">
              Share your experiences, ask questions, and learn from other {vehicleModel.name} owners
            </p>

            <div className="mb-8 bg-gradient-to-br from-muted/50 to-primary/5 rounded-xl p-6 border-2 border-primary/20">
              <Textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience, tips, or ask questions about this vehicle..."
                className="min-h-[120px] bg-background border-primary/20 mb-4 resize-none text-base"
              />
              <Button 
                onClick={handlePostComment}
                disabled={!comment.trim()}
                className="bg-primary hover:bg-primary/90 font-rajdhani font-semibold h-12 px-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </Button>
            </div>

            <div className="space-y-5">
              {comments.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-muted to-muted/50 rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-primary/50 shadow-lg">
                        <span className="font-rajdhani font-bold text-primary-foreground text-xl">
                          {c.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-rajdhani font-bold text-foreground text-lg">{c.user}</p>
                        <p className="text-sm text-muted-foreground font-roboto-mono">{c.time}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground mb-5 leading-relaxed text-base">{c.text}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-rajdhani font-semibold">
                      <ThumbsUp className="w-4 h-4" /> <span>{c.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-rajdhani font-semibold">
                      <ThumbsDown className="w-4 h-4" /> <span>{c.dislikes}</span>
                    </button>
                    <button 
                      onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-rajdhani font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" /> Reply
                    </button>
                  </div>

                  {/* Reply Input */}
                  {replyTo === c.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <Textarea 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        className="min-h-[80px] bg-background border-primary/20 mb-3 resize-none"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handlePostReply(c.id)}
                          disabled={!replyText.trim()}
                          className="bg-primary hover:bg-primary/90 font-rajdhani font-semibold disabled:opacity-50"
                        >
                          Post Reply
                        </Button>
                        <Button 
                          onClick={() => { setReplyTo(null); setReplyText(""); }}
                          variant="outline"
                          className="font-rajdhani font-semibold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Display Replies */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-6 pl-8 space-y-4 border-l-2 border-primary/20">
                      {c.replies.map((reply, replyIdx) => (
                        <motion.div
                          key={replyIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-background/50 rounded-lg p-4 border border-border"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center border-2 border-accent/50">
                              <span className="font-rajdhani font-bold text-primary-foreground text-sm">
                                {reply.user.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-rajdhani font-bold text-foreground">{reply.user}</p>
                              <p className="text-xs text-muted-foreground font-roboto-mono">{reply.time}</p>
                            </div>
                          </div>
                          <p className="text-foreground leading-relaxed text-sm">{reply.text}</p>
                          {reply.likes !== undefined && (
                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                              <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-rajdhani font-semibold">
                                <ThumbsUp className="w-3 h-3" /> <span>{reply.likes}</span>
                              </button>
                              {reply.dislikes !== undefined && (
                                <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-rajdhani font-semibold">
                                  <ThumbsDown className="w-3 h-3" /> <span>{reply.dislikes}</span>
                                </button>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default VehicleDetail;
