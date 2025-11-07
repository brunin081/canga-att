document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".step-content");
    let currentStep = 0;

    function updateStep() {
        steps.forEach((step, idx) => {
            step.classList.toggle("active", idx === currentStep);
        });
        stepContents.forEach((content, idx) => {
            content.classList.toggle("active", idx === currentStep);
        });
    }

    document.querySelectorAll(".nextBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep++;
            if (currentStep === 3) generateLessonPlan(); // na etapa de config gera o plano
            updateStep();
        });
    });

    document.querySelectorAll(".prevBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            updateStep();
        });
    });

    async function generateLessonPlan() {
        const data = {
            lessonTitle: document.getElementById("lessonTitle").value,
            lessonDescription: document.getElementById("lessonDescription").value,
            learningObjectives: document.getElementById("learningObjectives").value,
            subject: document.getElementById("subject").value,
            gradeLevel: document.getElementById("gradeLevel").value,
            studentCount: parseInt(document.getElementById("studentCount").value),
            averageAge: parseInt(document.getElementById("averageAge").value),
            duration: parseInt(document.getElementById("duration").value),
            resources: document.getElementById("resources").value,
            hasNeurodivergent: document.getElementById("hasNeurodivergent").checked
        };

        try {
            const response = await fetch("/generate_lesson_plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            document.getElementById("lessonResult").innerHTML = result.lesson_plan || "<p>Erro ao gerar plano</p>";
            document.getElementById("lessonResultFinal").innerHTML = result.lesson_plan || "<p>Erro ao gerar plano</p>";
        } catch (e) {
            document.getElementById("lessonResult").innerHTML = "<p>Erro de conexão com backend</p>";
        }
    }

    const newLessonBtn = document.getElementById("newLessonBtn");
    if (newLessonBtn) {
        newLessonBtn.addEventListener("click", () => {
            currentStep = 0;
            updateStep();
            document.getElementById("lessonTitle").value = "";
            document.getElementById("lessonDescription").value = "";
            document.getElementById("learningObjectives").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("gradeLevel").value = "";
            document.getElementById("studentCount").value = "";
            document.getElementById("averageAge").value = "";
            document.getElementById("duration").value = "";
            document.getElementById("resources").value = "";
            document.getElementById("hasNeurodivergent").checked = false;
            document.getElementById("lessonResult").innerHTML = "";
            document.getElementById("lessonResultFinal").innerHTML = "";
        });
    }
});
