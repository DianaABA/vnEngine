import React, { useState } from 'react'

// Educational Panel Component for Eastern Philosophy and Chakra Learning
export const EducationPanel: React.FC<{
  isOpen: boolean
  onClose: () => void
  currentEpisode?: {
    chakra?: any
    griefStage?: any
  }
}> = ({ isOpen, onClose, currentEpisode }) => {
  const [activeTab, setActiveTab] = useState<'chakras' | 'grief' | 'philosophy' | 'practices'>('chakras')

  if (!isOpen) return null

  return (
    <div className="education-panel-overlay">
      <div className="education-panel">
        <div className="education-header">
          <h2>🧘 Eastern Philosophy & Healing Guide</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="education-tabs">
          <button 
            className={`tab ${activeTab === 'chakras' ? 'active' : ''}`}
            onClick={() => setActiveTab('chakras')}
          >
            🌈 Chakras
          </button>
          <button 
            className={`tab ${activeTab === 'grief' ? 'active' : ''}`}
            onClick={() => setActiveTab('grief')}
          >
            💔 Healing Stages
          </button>
          <button 
            className={`tab ${activeTab === 'philosophy' ? 'active' : ''}`}
            onClick={() => setActiveTab('philosophy')}
          >
            🌸 Philosophy
          </button>
          <button 
            className={`tab ${activeTab === 'practices' ? 'active' : ''}`}
            onClick={() => setActiveTab('practices')}
          >
            🧘‍♀️ Practices
          </button>
        </div>
        
        <div className="education-content">
          {activeTab === 'chakras' && <ChakrasTab currentChakra={currentEpisode?.chakra} />}
          {activeTab === 'grief' && <GriefStagesTab currentStage={currentEpisode?.griefStage} />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'practices' && <PracticesTab currentChakra={currentEpisode?.chakra} />}
        </div>
      </div>
    </div>
  )
}

const ChakrasTab: React.FC<{ currentChakra?: any }> = ({ currentChakra }) => {
  const chakras = [
    {
      name: 'Root (Muladhara)',
      sanskrit: 'मूलाधार',
      color: '#C41E3A',
      element: 'Earth',
      location: 'Base of spine',
      sound: 'LAM',
      themes: ['Survival', 'Grounding', 'Safety', 'Foundation', 'Belonging'],
      imbalanced: ['Fear', 'Anxiety', 'Disconnection', 'Survival mode'],
      balanced: ['Grounded', 'Secure', 'Present', 'Stable']
    },
    {
      name: 'Sacral (Svadhisthana)',
      sanskrit: 'स्वाधिष्ठान',
      color: '#FF6B35',
      element: 'Water',
      location: 'Below navel',
      sound: 'VAM',
      themes: ['Creativity', 'Sexuality', 'Emotion', 'Pleasure', 'Flow'],
      imbalanced: ['Creative blocks', 'Emotional numbness', 'Guilt', 'Addiction'],
      balanced: ['Creative', 'Passionate', 'Emotionally fluid', 'Joyful']
    },
    {
      name: 'Solar Plexus (Manipura)',
      sanskrit: 'मणिपूर',
      color: '#FFD23F',
      element: 'Fire',
      location: 'Above navel',
      sound: 'RAM',
      themes: ['Personal power', 'Will', 'Confidence', 'Transformation'],
      imbalanced: ['Low self-esteem', 'Control issues', 'Anger', 'Victim mentality'],
      balanced: ['Confident', 'Purposeful', 'Empowered', 'Self-disciplined']
    },
    {
      name: 'Heart (Anahata)',
      sanskrit: 'अनाहत',
      color: '#4CBB17',
      element: 'Air',
      location: 'Center of chest',
      sound: 'YAM',
      themes: ['Love', 'Compassion', 'Connection', 'Forgiveness', 'Empathy'],
      imbalanced: ['Closed heart', 'Resentment', 'Loneliness', 'Codependency'],
      balanced: ['Loving', 'Compassionate', 'Connected', 'Forgiving']
    },
    {
      name: 'Throat (Vishuddha)',
      sanskrit: 'विशुद्ध',
      color: '#0047AB',
      element: 'Space',
      location: 'Throat',
      sound: 'HAM',
      themes: ['Communication', 'Truth', 'Expression', 'Authenticity'],
      imbalanced: ['Fear of speaking', 'Lies', 'Gossiping', 'Silent treatment'],
      balanced: ['Truthful', 'Expressive', 'Good listener', 'Authentic']
    },
    {
      name: 'Third Eye (Ajna)',
      sanskrit: 'आज्ञा',
      color: '#4B0082',
      element: 'Light',
      location: 'Between eyebrows',
      sound: 'OM',
      themes: ['Intuition', 'Wisdom', 'Insight', 'Imagination', 'Psychic abilities'],
      imbalanced: ['Confusion', 'Illusion', 'Lack of insight', 'Nightmares'],
      balanced: ['Intuitive', 'Wise', 'Insightful', 'Imaginative']
    },
    {
      name: 'Crown (Sahasrara)',
      sanskrit: 'सहस्रार',
      color: '#9370DB',
      element: 'Thought',
      location: 'Top of head',
      sound: 'Silence',
      themes: ['Spirituality', 'Connection to divine', 'Enlightenment', 'Unity'],
      imbalanced: ['Spiritual disconnection', 'Materialism', 'Cynicism'],
      balanced: ['Spiritually connected', 'Wise', 'At peace', 'Enlightened']
    }
  ]

  return (
    <div className="chakras-content">
      <div className="chakras-intro">
        <h3>The Seven Chakras</h3>
        <p>The chakras are energy centers in the body that correspond to different aspects of our physical, emotional, and spiritual well-being. In ChakraHearts, each episode focuses on healing and balancing a specific chakra.</p>
      </div>

      {currentChakra && (
        <div className="current-chakra-highlight">
          <h4>🎯 Current Episode Focus</h4>
          <div className="chakra-card current">
            <div className="chakra-color" style={{ backgroundColor: currentChakra.color }}></div>
            <div className="chakra-info">
              <h5>{currentChakra.name}</h5>
              <p className="sanskrit">{currentChakra.sanskrit}</p>
              <p className="description">{currentChakra.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="chakras-grid">
        {chakras.map((chakra, index) => (
          <div key={index} className={`chakra-card ${currentChakra?.name === chakra.name ? 'current' : ''}`}>
            <div className="chakra-color" style={{ backgroundColor: chakra.color }}></div>
            <div className="chakra-details">
              <h4>{chakra.name}</h4>
              <p className="sanskrit">{chakra.sanskrit}</p>
              <div className="chakra-properties">
                <p><strong>Element:</strong> {chakra.element}</p>
                <p><strong>Location:</strong> {chakra.location}</p>
                <p><strong>Sound:</strong> {chakra.sound}</p>
              </div>
              
              <div className="chakra-themes">
                <h5>Core Themes</h5>
                <div className="theme-tags">
                  {chakra.themes.map((theme, i) => (
                    <span key={i} className="theme-tag">{theme}</span>
                  ))}
                </div>
              </div>
              
              <div className="balance-states">
                <div className="imbalanced">
                  <h6>When Imbalanced</h6>
                  <ul>
                    {chakra.imbalanced.map((state, i) => (
                      <li key={i}>{state}</li>
                    ))}
                  </ul>
                </div>
                <div className="balanced">
                  <h6>When Balanced</h6>
                  <ul>
                    {chakra.balanced.map((state, i) => (
                      <li key={i}>{state}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const GriefStagesTab: React.FC<{ currentStage?: any }> = ({ currentStage }) => {
  const stages = [
    {
      name: 'Denial',
      description: 'Refusing to accept the reality of loss or change',
      characteristics: ['Shock', 'Numbness', 'Avoidance', 'Disbelief'],
      healing: ['Gentle acknowledgment', 'Safe expression', 'Gradual acceptance'],
      color: '#FF6B6B'
    },
    {
      name: 'Anger',
      description: 'Emotional reaction to perceived injustice or powerlessness',
      characteristics: ['Rage', 'Blame', 'Resentment', 'Frustration'],
      healing: ['Healthy expression', 'Physical release', 'Boundary setting'],
      color: '#FF8E53'
    },
    {
      name: 'Bargaining',
      description: 'Attempting to negotiate or make deals to avoid pain',
      characteristics: ['Negotiation', 'Hope for reversal', 'What-if thinking'],
      healing: ['Accepting powerlessness', 'Finding meaning', 'Spiritual growth'],
      color: '#FFD93D'
    },
    {
      name: 'Depression',
      description: 'Deep sadness and withdrawal as reality sets in',
      characteristics: ['Sadness', 'Withdrawal', 'Emptiness', 'Despair'],
      healing: ['Emotional support', 'Self-compassion', 'Professional help if needed'],
      color: '#6BCF7F'
    },
    {
      name: 'Acceptance',
      description: 'Finding peace and integration with the new reality',
      characteristics: ['Peace', 'Understanding', 'Integration', 'Growth'],
      healing: ['Continued growth', 'Helping others', 'Living fully'],
      color: '#4D96FF'
    }
  ]

  return (
    <div className="grief-stages-content">
      <div className="grief-intro">
        <h3>The Five Stages of Grief</h3>
        <p>Originally developed by Elisabeth Kübler-Ross, these stages help us understand the emotional journey through loss and transformation. In ChakraHearts, each episode corresponds to a stage of healing.</p>
        
        <div className="important-note">
          <h4>📌 Important Notes</h4>
          <ul>
            <li>These stages are not linear - you may experience them in any order</li>
            <li>You may revisit stages multiple times</li>
            <li>Healing is a personal journey that takes time</li>
            <li>Support from others can be crucial in the healing process</li>
          </ul>
        </div>
      </div>

      {currentStage && (
        <div className="current-stage-highlight">
          <h4>🎯 Current Episode Focus: {currentStage.name}</h4>
          <p>{currentStage.description}</p>
        </div>
      )}

      <div className="stages-timeline">
        {stages.map((stage, index) => (
          <div key={index} className={`stage-card ${currentStage?.name === stage.name ? 'current' : ''}`}>
            <div className="stage-number" style={{ backgroundColor: stage.color }}>
              {index + 1}
            </div>
            <div className="stage-content">
              <h4>{stage.name}</h4>
              <p className="stage-description">{stage.description}</p>
              
              <div className="stage-details">
                <div className="characteristics">
                  <h5>Common Experiences</h5>
                  <ul>
                    {stage.characteristics.map((char, i) => (
                      <li key={i}>{char}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="healing-approaches">
                  <h5>Healing Approaches</h5>
                  <ul>
                    {stage.healing.map((heal, i) => (
                      <li key={i}>{heal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PhilosophyTab: React.FC = () => {
  const concepts = [
    {
      title: 'Dark Forest Theory',
      origin: 'Liu Cixin\'s Three-Body Problem',
      description: 'The universe as a dark forest where civilizations hide from each other for survival',
      relevance: 'Represents the choice between fear-based isolation and trust-based connection',
      keyIdeas: [
        'Advanced civilizations may destroy others to ensure their own survival',
        'The choice between revealing yourself or hiding in fear',
        'Trust as a revolutionary act in a hostile universe'
      ]
    },
    {
      title: 'Yoga Philosophy',
      origin: 'Ancient Indian tradition (5000+ years)',
      description: 'Union of mind, body, and spirit through conscious practice and awareness',
      relevance: 'The foundation of the chakra system and personal transformation',
      keyIdeas: [
        'Yoga means "union" or "to yoke together"',
        'Eight limbs of yoga include ethical guidelines, physical practices, and meditation',
        'The goal is self-realization and liberation from suffering'
      ]
    },
    {
      title: 'Buddhist Compassion',
      origin: 'Buddhist teachings (2500+ years)',
      description: 'Universal compassion and the interconnectedness of all beings',
      relevance: 'The healing power of compassion for self and others',
      keyIdeas: [
        'All beings suffer and desire to be free from suffering',
        'Compassion arises naturally when we see our interconnectedness',
        'Self-compassion is the foundation for compassion toward others'
      ]
    },
    {
      title: 'Simulation Theory',
      origin: 'Modern philosophy and physics',
      description: 'The possibility that reality as we know it is a simulated environment',
      relevance: 'Questions about the nature of reality and conscious choice within it',
      keyIdeas: [
        'Our perceived reality might be a computer simulation',
        'Even in a simulation, our experiences and choices have meaning',
        'The importance of how we choose to live regardless of the nature of reality'
      ]
    }
  ]

  return (
    <div className="philosophy-content">
      <div className="philosophy-intro">
        <h3>Eastern Philosophy & Modern Concepts</h3>
        <p>ChakraHearts weaves together ancient wisdom and modern ideas to create a rich tapestry of meaning. These philosophical concepts provide depth and context to the story's themes.</p>
      </div>

      <div className="concepts-grid">
        {concepts.map((concept, index) => (
          <div key={index} className="concept-card">
            <h4>{concept.title}</h4>
            <p className="origin">Origin: {concept.origin}</p>
            <p className="description">{concept.description}</p>
            
            <div className="relevance">
              <h5>Relevance to ChakraHearts</h5>
              <p>{concept.relevance}</p>
            </div>
            
            <div className="key-ideas">
              <h5>Key Ideas</h5>
              <ul>
                {concept.keyIdeas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PracticesTab: React.FC<{ currentChakra?: any }> = ({ currentChakra }) => {
  const practices = {
    meditation: {
      title: 'Chakra Meditation',
      description: 'Focus on each chakra location while breathing deeply',
      steps: [
        'Sit comfortably with your spine straight',
        'Close your eyes and take several deep breaths',
        'Focus on the chakra location',
        'Visualize the chakra color glowing and spinning',
        'Breathe into that area for 5-10 minutes',
        'End with gratitude and slowly open your eyes'
      ]
    },
    breathing: {
      title: 'Pranayama (Breath Work)',
      description: 'Use breath to activate and balance chakras',
      techniques: [
        'Three-part breath: Belly, ribs, chest',
        'Alternate nostril breathing for balance',
        'Breath of fire for solar plexus activation',
        'Humming bee breath for throat chakra'
      ]
    },
    yoga: {
      title: 'Yoga Asanas',
      description: 'Physical poses that activate specific chakras',
      poses: {
        'Root': ['Mountain Pose', 'Tree Pose', 'Warrior I', 'Child\'s Pose'],
        'Sacral': ['Hip circles', 'Goddess Pose', 'Pigeon Pose', 'Cobra'],
        'Solar Plexus': ['Boat Pose', 'Plank', 'Sun Salutations', 'Warrior III'],
        'Heart': ['Camel Pose', 'Bridge Pose', 'Fish Pose', 'Backbends'],
        'Throat': ['Lion\'s Breath', 'Fish Pose', 'Shoulder Stand', 'Plow'],
        'Third Eye': ['Child\'s Pose', 'Forward Folds', 'Meditation Poses'],
        'Crown': ['Headstand', 'Lotus Pose', 'Savasana', 'Silent Meditation']
      }
    },
    affirmations: {
      title: 'Chakra Affirmations',
      description: 'Positive statements to balance each chakra',
      statements: {
        'Root': ['I am safe and secure', 'I belong here', 'I am grounded'],
        'Sacral': ['I am creative', 'I embrace my emotions', 'I am worthy of pleasure'],
        'Solar Plexus': ['I am confident', 'I have personal power', 'I make good choices'],
        'Heart': ['I am loved', 'I give and receive love freely', 'I forgive myself and others'],
        'Throat': ['I speak my truth', 'I communicate clearly', 'I am authentic'],
        'Third Eye': ['I trust my intuition', 'I see clearly', 'I am wise'],
        'Crown': ['I am connected to all', 'I am at peace', 'I am one with the universe']
      }
    }
  }

  return (
    <div className="practices-content">
      <div className="practices-intro">
        <h3>🧘‍♀️ Chakra Healing Practices</h3>
        <p>These practices can help you balance and activate your chakras in real life. Try them as you play through each episode to deepen your experience.</p>
      </div>

      {currentChakra && (
        <div className="current-chakra-practices">
          <h4>🎯 Practices for {currentChakra.name}</h4>
          <div className="chakra-specific-practices">
            {practices.yoga.poses[currentChakra.name.split(' ')[0]] && (
              <div className="practice-section">
                <h5>Recommended Yoga Poses</h5>
                <div className="pose-list">
                  {practices.yoga.poses[currentChakra.name.split(' ')[0]].map((pose, i) => (
                    <span key={i} className="pose-tag">{pose}</span>
                  ))}
                </div>
              </div>
            )}
            
            {practices.affirmations.statements[currentChakra.name.split(' ')[0]] && (
              <div className="practice-section">
                <h5>Affirmations</h5>
                <ul>
                  {practices.affirmations.statements[currentChakra.name.split(' ')[0]].map((affirmation, i) => (
                    <li key={i}>"{affirmation}"</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="practices-grid">
        {Object.entries(practices).map(([key, practice]) => (
          <div key={key} className="practice-card">
            <h4>{practice.title}</h4>
            <p>{practice.description}</p>
            
            {practice.steps && (
              <div className="practice-steps">
                <h5>Steps</h5>
                <ol>
                  {practice.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {practice.techniques && (
              <div className="practice-techniques">
                <h5>Techniques</h5>
                <ul>
                  {practice.techniques.map((technique, i) => (
                    <li key={i}>{technique}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="practice-tips">
        <h4>💡 Practice Tips</h4>
        <ul>
          <li>Start with just 5-10 minutes daily</li>
          <li>Consistency is more important than duration</li>
          <li>Listen to your body and don't force anything</li>
          <li>Create a peaceful, dedicated space for practice</li>
          <li>Be patient and compassionate with yourself</li>
          <li>Consider working with a qualified teacher</li>
        </ul>
      </div>
    </div>
  )
}

export default EducationPanel