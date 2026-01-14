# Spring Boot to Node.js Conversion Guide

## Feature Mapping

### Core Framework
| Spring Boot | Node.js/Express |
|------------|-----------------|
| `@SpringBootApplication` | `express()` |
| `@RestController` | `express.Router()` |
| `@Service` | Service classes |
| `@Repository` | Mongoose models |
| `@Entity` | Mongoose schemas |
| `@Autowired` | `import` statements |
| `@Value` | `process.env.VAR_NAME` |
| `application.properties` | `.env` file |

### HTTP Annotations
| Spring Boot | Express |
|------------|---------|
| `@GetMapping` | `router.get()` |
| `@PostMapping` | `router.post()` |
| `@PutMapping` | `router.put()` |
| `@DeleteMapping` | `router.delete()` |
| `@PathVariable` | `req.params.id` |
| `@RequestParam` | `req.query.param` |
| `@RequestBody` | `req.body` |

### Validation
| Spring Boot | Node.js |
|------------|---------|
| `@Valid` | `express-validator` |
| `@NotNull` | `body('field').notEmpty()` |
| `@Email` | `body('field').isEmail()` |
| `@Size(min, max)` | `body('field').isLength()` |

### Security
| Spring Boot | Node.js |
|------------|---------|
| Spring Security | `jsonwebtoken` + middleware |
| `@PreAuthorize` | `protect`, `authorize` middleware |
| `SecurityContext` | `req.user` |
| `PasswordEncoder` | `bcryptjs` |

### Database
| Spring JPA | Mongoose |
|-----------|----------|
| `@Entity` | `new mongoose.Schema()` |
| `@Id` | `_id` (automatic) |
| `@GeneratedValue` | `_id` (automatic) |
| `@Column` | Schema field definition |
| `@OneToMany` | Array of refs |
| `@ManyToOne` | `type: ObjectId, ref` |
| `findById()` | `Model.findById()` |
| `findAll()` | `Model.find()` |
| `save()` | `Model.create()` or `.save()` |

## Code Examples

### Spring Boot Controller → Express Router

**Spring Boot:**
```java
@RestController
@RequestMapping("/api/people")
public class PeopleController {
    
    @Autowired
    private PeopleService peopleService;
    
    @GetMapping
    public ResponseEntity<List<People>> getAll() {
        return ResponseEntity.ok(peopleService.findAll());
    }
    
    @PostMapping
    public ResponseEntity<People> create(@Valid @RequestBody People people) {
        return ResponseEntity.status(201).body(peopleService.save(people));
    }
}
```

**Node.js/Express:**
```javascript
import express from 'express';
import peopleService from '../services/peopleService.js';
import { validate } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const people = await peopleService.getAll();
    res.status(200).json({ success: true, data: people });
  } catch (error) {
    next(error);
  }
});

router.post('/', validate, async (req, res, next) => {
  try {
    const person = await peopleService.create(req.body);
    res.status(201).json({ success: true, data: person });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Spring Service → Node.js Service

**Spring Boot:**
```java
@Service
public class PeopleService {
    
    @Autowired
    private PeopleRepository repository;
    
    public List<People> findAll() {
        return repository.findAll();
    }
    
    public People save(People people) {
        return repository.save(people);
    }
}
```

**Node.js:**
```javascript
import People from '../models/People.js';

class PeopleService {
  async getAll() {
    return await People.find();
  }
  
  async create(data) {
    return await People.create(data);
  }
}

export default new PeopleService();
```

### Spring Entity → Mongoose Model

**Spring Boot:**
```java
@Entity
@Table(name = "people")
public class People {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String email;
    
    // Getters and setters
}
```

**Node.js/Mongoose:**
```javascript
import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  }
}, { timestamps: true });

export default mongoose.model('People', peopleSchema);
```

### Spring Security → JWT Middleware

**Spring Boot:**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .authorizeHttpRequests()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/public/**").permitAll();
        return http.build();
    }
}
```

**Node.js:**
```javascript
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError('Not authorized', 401));
  }
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized', 403));
    }
    next();
  };
};

// Usage:
router.use('/admin', protect, authorize('ADMIN'));
```

## Migration Steps

1. **Set up Node.js project**
   ```bash
   npm init
   npm install express mongoose dotenv bcryptjs jsonwebtoken
   ```

2. **Create folder structure**
   - `config/` - Configuration files
   - `models/` - Mongoose schemas
   - `controllers/` - Request handlers
   - `services/` - Business logic
   - `routes/` - Route definitions
   - `middlewares/` - Custom middleware

3. **Convert entities to Mongoose schemas**
   - Map Java types to JavaScript types
   - Add validation rules
   - Define relationships

4. **Convert repositories to Mongoose queries**
   - `findAll()` → `Model.find()`
   - `findById()` → `Model.findById()`
   - `save()` → `Model.create()` or `.save()`

5. **Convert services**
   - Keep business logic similar
   - Use async/await instead of CompletableFuture
   - Handle errors with try-catch

6. **Convert controllers**
   - Map HTTP methods
   - Use Express route handlers
   - Return JSON responses

7. **Implement authentication**
   - JWT instead of Spring Security
   - Cookie-based sessions
   - Middleware for protection

8. **Add validation**
   - Use express-validator
   - Define validation chains
   - Handle validation errors

9. **Configure CORS**
   - Allow frontend origin
   - Enable credentials
   - Set proper headers

10. **Test all endpoints**
    - Use Postman or cURL
    - Verify authentication
    - Test file uploads
